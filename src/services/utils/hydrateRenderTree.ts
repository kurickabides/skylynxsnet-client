// ================================================
// ✅ Utility: hydrateRenderTree
// Description: Walks SkylynxPortalTree tree and hydrates each node with resolved metadata
// Author: NimbusCore.OpenAI
// Architect: Chad Martin
// Company: CryoRio
// Filename: services/utils/hydrateRenderTree.ts
// ================================================

import {
  SkylynxTemplateNode,
  SkylynxPortalTree,
  ITargetComponent,
  ITargetRegistryEntry,
} from "../../components/core/types";
import { TargetRegistry } from "../../components/core/targetRegistry/targetRegistry";
import { IPortal } from "../../entities/portal";

/**
 * Recursively resolves all target metadata for a SkylynxTemplateNode subtree.
 * @param node - A node from the tree to hydrate
 * @returns A Promise resolving to the hydrated node
 */
async function hydrateNode(
  node: SkylynxTemplateNode
): Promise<SkylynxTemplateNode> {
  const hydratedNode: SkylynxTemplateNode = {
    ...node,
    template: { ...node.template },
    children: node.children ? [...node.children] : [],
  };

  const { template } = hydratedNode;

  if (template.targetID && template.templateType?.TargetTypeName) {
    try {
      const resolvedEntry: ITargetRegistryEntry = await TargetRegistry.resolve(
        template.templateType.TargetTypeName,
        template.targetID
      );

      hydratedNode.targetObject = {
        data: resolvedEntry.data ?? {},
      };
    } catch (err) {
      console.warn(
        `⚠️ Failed to resolve target for ${template.templateName} (${template.templateType.TargetTypeName}):`,
        err
      );
      hydratedNode.targetObject = {
        data: {},
      };
    }
  }

  if (hydratedNode.children?.length) {
    hydratedNode.children = await Promise.all(
      hydratedNode.children.map(hydrateNode)
    );
  }

  return hydratedNode;
}

/**
 * Hydrates a full SkylynxPortalTree, including its PortalTemplate and child nodes.
 * @param tree - The full portal tree object
 * @returns A Promise resolving to the hydrated tree
 */
export async function hydrateRenderTree(
  tree: SkylynxPortalTree
): Promise<SkylynxPortalTree> {
  const hydratedTree: SkylynxPortalTree = {
    ...tree,
    PortalTemplate: { ...tree.PortalTemplate },
    children: tree.children ? [...tree.children] : [],
  };

  const { PortalTemplate } = hydratedTree;

  if (PortalTemplate.targetID && PortalTemplate.templateType?.TargetTypeName) {
    try {
      const resolvedEntry: ITargetRegistryEntry = await TargetRegistry.resolve(
        PortalTemplate.templateType.TargetTypeName,
        PortalTemplate.targetID
      );

      const portalObj = resolvedEntry.data?.["IPortal"];
      if (portalObj) {
        hydratedTree.PortalObject = portalObj as IPortal;
      }
    } catch (err) {
      console.warn(
        `⚠️ Failed to resolve target for PortalTemplate (${PortalTemplate.templateType.TargetTypeName}):`,
        err
      );
      hydratedTree.PortalObject = {
        portalID: "MissingComponent",
        portalName: "MissingComponent",
        Description: "MissingComponent",
      };
    }
  }

  if (hydratedTree.children?.length) {
    hydratedTree.children = await Promise.all(
      hydratedTree.children.map(hydrateNode)
    );
  }

  return hydratedTree;
}
