// ================================================
// ✅ Factory: TreeFactory
// Description: Recursively renders the SkylynxRenderNode tree using factories
// Author: NimbusCore.OpenAI
// Architect: Chad Martin
// Company: CryoRio
// Filename: factories/treeFactory.tsx
// ================================================

import React from "react";
import { SkylynxRenderNode } from "../../components/core/types";
import { ProtosTargetTypeEnum } from "../../entities/portal";

import { PortalFactory } from "./portalFactory";
import { LayoutFactory } from "./layoutFactory";
import { PageFactory } from "./pageFactory";
import { ModuleFactory } from "./moduleFactory";
import { DyFormFactory } from "./dyFormFactory";

export function TreeFactory(
  node: SkylynxRenderNode,
  parent?: SkylynxRenderNode
): JSX.Element | null {
  if (!node || !node.template?.templateType?.TargetTypeName) return null;

  const type = node.template.templateType.TargetTypeName;

  switch (type) {
    case ProtosTargetTypeEnum.Portal:
      return PortalFactory(node);
    case ProtosTargetTypeEnum.Layout:
      return LayoutFactory(node);
    case ProtosTargetTypeEnum.Page:
      return PageFactory(node);
    case ProtosTargetTypeEnum.Module:
      return ModuleFactory(node);
    case ProtosTargetTypeEnum.DyForm:
      return DyFormFactory(node);
    default:
      console.warn(`🚫 Unknown node type: ${type}`);
      return null;
  }
}
