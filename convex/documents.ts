import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";

export const getSidebar = query({
  args: {
    parentDocument: v.optional(v.id("documents")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("No user identity");
    const userId = identity.subject;
    const documents = await ctx.db
      .query("documents")
      .withIndex("by_user_parent", (q) =>
        q.eq("userId", userId).eq("parentDocument", args.parentDocument)
      )
      .filter((self) => self.eq(self.field("isArchived"), false))
      .order("desc")
      .collect();
    return documents;
  },
});

export const getDocument = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("No user identity");
    const documents = await ctx.db.query("documents").collect();
    return documents;
  },
});

export const createDocument = mutation({
  args: {
    title: v.string(),
    parentDocument: v.optional(v.id("documents")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("No user identity");
    const userId = identity.subject;
    const newDocument = await ctx.db.insert("documents", {
      title: args.title,
      parentDocument: args.parentDocument,
      isArchived: false,
      userId,
      isPublished: false,
    });
    return newDocument;
  },
});

export const archiveDocument = mutation({
  args: {
    documentId: v.id("documents"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("No user identity");
    const userId = identity.subject;
    const existingDocument = await ctx.db.get(args.documentId);
    if (!existingDocument) throw new Error("No document found");
    if (existingDocument.userId !== userId)
      throw new Error("User does not own document");

    const recursiveArchive = async (documentId: Id<"documents">) => {
      const children = await ctx.db
        .query("documents")
        .withIndex("by_user_parent", (q) =>
          q.eq("userId", userId).eq("parentDocument", documentId)
        )
        .collect();
      for (const child of children) {
        await ctx.db.patch(child._id, {
          isArchived: true,
        });
        await recursiveArchive(child._id);
      }
    };
    const document = await ctx.db.patch(args.documentId, {
      isArchived: true,
    });
    await recursiveArchive(args.documentId);
    return document;
  },
});

export const getTrashNotes = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("No user identity");
    const userId = identity.subject;
    return await ctx.db
      .query("documents")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("isArchived"), true))
      .order("desc")
      .collect();
  },
});

export const restoreNotes = mutation({
  args: {
    documentId: v.id("documents"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("No user identity");
    const userId = identity.subject;
    const existingDocument = await ctx.db.get(args.documentId);
    if (!existingDocument) throw new Error("No document found");
    if (existingDocument.userId !== userId)
      throw new Error("User does not own document");
    const recursiveRestore = async (documentId: Id<"documents">) => {
      const children = await ctx.db
        .query("documents")
        .withIndex("by_user_parent", (q) =>
          q.eq("userId", userId).eq("parentDocument", documentId)
        )
        .collect();
      for (const child of children) {
        await ctx.db.patch(child._id, {
          isArchived: false,
        });
        await recursiveRestore(child._id);
      }
    };
    const options: Partial<Doc<"documents">> = {
      isArchived: false,
    };
    if (existingDocument.parentDocument) {
      const parentDocument = await ctx.db.get(existingDocument.parentDocument);
      if (!!parentDocument && parentDocument.isArchived) {
        options.parentDocument = undefined;
      }
    }
    const document = await ctx.db.patch(args.documentId, options);
    await recursiveRestore(args.documentId);
    return document;
  },
});

export const removeNotes = mutation({
  args: {
    documentId: v.id("documents"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("No user identity");
    const userId = identity.subject;
    const existingDocument = await ctx.db.get(args.documentId);
    if (!existingDocument) throw new Error("No document found");
    if (existingDocument.userId !== userId)
      throw new Error("User does not own document");
    const recursiveRemove = async (documentId: Id<"documents">) => {
      const children = await ctx.db
        .query("documents")
        .withIndex("by_user_parent", (q) =>
          q.eq("userId", userId).eq("parentDocument", documentId)
        )
        .collect();
      for (const child of children) {
        await ctx.db.delete(child._id);
        await recursiveRemove(child._id);
      }
    };
    const document = await ctx.db.delete(args.documentId);
    await recursiveRemove(args.documentId);
    return document;
  },
});

export const getSearchNotes = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;
    const userId = identity.subject;
    return await ctx.db
      .query("documents")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("isArchived"), false))
      .order("desc")
      .collect();
  },
});

export const getById = query({
  args: {
    documentId: v.id("documents"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    // // if (!identity) return null;

    const document = await ctx.db.get(args.documentId);
    if (!document) return null;
    if (document.isPublished && !document.isArchived) return document;
    if (!identity) throw new Error("No user identity");
    const userId = identity.subject;
    if (document.userId !== userId)
      throw new Error("User does not own document");
    return document;
  },
});

export const updateDocuments = mutation({
  args: {
    id: v.id("documents"),
    title: v.optional(v.string()),
    content: v.optional(v.string()),
    coverImage: v.optional(v.string()),
    isPublished: v.optional(v.boolean()),
    icon: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("No user identity");
    const existingDocument = await ctx.db.get(args.id);
    if (!existingDocument) throw new Error("No document found");
    const userId = identity.subject;
    if (existingDocument.userId !== userId)
      throw new Error("User does not own document");

    const { id, ...rest } = args;
    const document = await ctx.db.patch(args.id, { ...rest });
    return document;
  },
});

