import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule
} from "vuex-module-decorators";
import store from "@/store/store";
import ProjectInfo from "../../types/ProjectInfo";
import LocalStorageUtils from "../../utils/LocalStorageUtils";
import StorageKey from "../../const/StorageKey";
import FileUtils from "../../utils/local/FileUtils";

export interface IProjectState {
  projects: ProjectInfo[];
  selectedIndex: number;
}

@Module({ dynamic: true, store, name: "project" })
class Project extends VuexModule implements IProjectState {
  public projects: ProjectInfo[] =
    LocalStorageUtils.getValue2<ProjectInfo[]>(StorageKey.PROJECTS, []) || [];
  public selectedIndex: number = parseInt(
    LocalStorageUtils.getString(StorageKey.SELECTED_INDEX) || "-1"
  );

  @Mutation
  public setSelectedIndex(index: number) {
    this.selectedIndex = index;
    LocalStorageUtils.setString(
      StorageKey.SELECTED_INDEX,
      this.selectedIndex + ""
    );
  }

  @Mutation
  public addProject(project: ProjectInfo) {
    if (project) {
      this.projects.push(project);
      LocalStorageUtils.setValue<ProjectInfo[]>(
        StorageKey.PROJECTS,
        this.projects
      );
    }
  }

  @Mutation
  public removeProject(project: ProjectInfo) {
    if (project) {
      const index = this.projects.findIndex(item => item.id === project.id);
      this.projects.splice(index, 1);
      LocalStorageUtils.setValue<ProjectInfo[]>(
        StorageKey.PROJECTS,
        this.projects
      );
    }
  }

  @Mutation
  public updateProject(project: ProjectInfo) {
    if (project) {
      LocalStorageUtils.setValue<ProjectInfo[]>(
        StorageKey.PROJECTS,
        this.projects
      );
      FileUtils.writeFile(
        "C:/apk/project.config",
        JSON.stringify(this.projects)
      );
      // let ps: ProjectInfo[] = [];
      // ps = JSON.parse(JSON.stringify(this.projects));
      // console.error("try read file:");
      // console.dir(ps);

      // console.error("updateProject");
      // console.dir(this.projects);
    }
  }

  // @Mutation
  // private TOGGLE_SIDEBAR(withoutAnimation: boolean) {
  //   console.log("test code starts here:AppModule.TOGGLE_SIDEBAR");
  //   setSidebarStatus("opened");
  // }

  // @Mutation
  // private TOGGLE_DEVICE(device: DeviceType) {
  //   this.device = device;
  // }

  // @Action
  // public SetSize(size: string) {
  //   this.SET_SIZE(size);
  // }
}

const ProjectModule = getModule(Project);

export default ProjectModule;
