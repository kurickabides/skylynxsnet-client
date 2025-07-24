import { SkylynxDataModel } from "../../components/core/types";

export interface IPortal extends  SkylynxDataModel{
  portalID: string;
  portalName: string;
  Description: string;
  createdAt?: Date;
}

export interface IModule extends SkylynxDataModel {
  moduleID: string;
  moduleName: string; // e.g. "UserProfileManager"
  ModuleDescription?: string;
  imageFilePath?: string;
  ContentFilePath?: boolean;
}

export interface PortalPageModel extends SkylynxDataModel {
  pageId: string;
  pageName: string; // e.g. "Account Settings"
  routePath: string; // e.g. "/settings/profile"
  layoutId: string;
  isPublic: boolean;
}
export interface PortalPageModuleMap {
  pageId: string;
  moduleId: string;
  position: string; // e.g. "main", "sidebar", "footer"
  sortOrder: number;
}

export interface PortalLayoutModel extends SkylynxDataModel {
  layoutId: string;
  name: string;
  templateKey: string; // e.g. "2ColWithSidebar"
  regions: string[]; // e.g. ["header", "main", "sidebar", "footer"]
}

export interface PortalNavigationItem {
  navId: string;
  pageId: string;
  displayName: string;
  icon?: string;
  routePath: string;
  sortOrder: number;
  parentNavId?: string; // for nesting
}

export interface PortalPageViewModel {
  portalName: string;
  page: PortalPageModel;
  layout: PortalLayoutModel;
  modules: PortalPageModuleMap[];
  navigation: PortalNavigationItem[];
}

export interface PageFactoryInput {
  page: PortalPageModel;
  layout: PortalLayoutModel;
  modules: PortalPageModuleMap[];
  navigation: PortalNavigationItem[];
}

export enum ProtosTargetTypeEnum {
  Portal = "Portal",
  Theme = "Theme",
  Layout = "Layout",
  Page = "Page",
  Module = "Module",
  DataModel = "DataModel",
  DyForm = "DyForm",
  ViewModel = "ViewModel",
  ThemeColors = "ThemeColors",
}
