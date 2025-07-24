// ================================================
// ✅ Factory: PageFactory
// Description: Builds a single Page node with title/header wrapper
// Author: NimbusCore.OpenAI
// Architect: Chad Martin
// Company: CryoRio
// Filename: factories/pageFactory.tsx
// ================================================

import React from "react";
import { TreeFactory } from "./treeFactory";
import {
  SkylynxRenderNode,
  ISkylynxViewModel,
} from "../../components/core/types";
import PageWrapper from "../../components/ui/page/pageWrapper";

export function PageFactory(
  node: SkylynxRenderNode<ISkylynxViewModel>
): JSX.Element {
  const children = node.children || [];

  return (
    <PageWrapper renderNode={node}>
      {children.map((childNode, index) => (
        <React.Fragment key={index}>
          {TreeFactory(childNode, node)}
        </React.Fragment>
      ))}
    </PageWrapper>
  );
}
