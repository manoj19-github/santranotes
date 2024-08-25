import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";

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
