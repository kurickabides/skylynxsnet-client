

// ================================================
// ✅ Skylynx Core Types Interfaces: 
// Description: Holds all core global types shared across all modules
// Author: NimbusCore.OpenAI
// Architect: Chad Martin
// Company: CryoRio
// Filename: types/skylynx/core/types.ts
// ================================================


export interface SkylynxPortalTreeState {
  tree?: SkylynxPortalTree;
  loading: boolean;
  error?: string;
}

export interface ProtosTargetTypeState {
  types: TemplateType[];
  loading: boolean;
  error?: string;
}

export interface IResolver {
  resolverId: string;
  resolverType: string; // from ResolverType table
  target: string;
  description?: string;
}

export interface SkylynxPortalTree {
  PortalName: string;
  PortalTemplate: ProtosTemplate;
  children?: SkylynxTemplateNode[];
}


export interface ProtosTemplate {
  templateID: string;
  templateName: string;
  templateType: TemplateType;
  version: string;
  versionID: string; // TemplateVersionID
  resolver?: IResolver;
  sortOrder?: number;
  targetID?: string;
}


export type TemplateRelationship = {
  parentType: string;
  allowedChildTypes: string[];
};

// ================================================
// ✅ Interface: SkylynxPortalViewModel
// Description: Represents a ViewModel node in the config tree
// ================================================
export interface SkylynxTemplateNode {
  nodeName: string;
  template: ProtosTemplate;
  children?: SkylynxTemplateNode[];
}

export interface TemplateType {
  targetTypeID: string;
  TargetTypeName?: string;
  description?: string;
  createdAt?: Date;
}

export interface ProtosTargetTypeState {
  types: TemplateType[];
  loading: boolean;
  error?: string;
}
