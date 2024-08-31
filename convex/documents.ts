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