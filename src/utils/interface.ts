
//- 组件列表区
//- 组件列表_组件项
export interface CompItem_Menu {
    type: string,
    name: string,
    args: any
}
//- 组件列表数据仓库
export interface ComponentMenuState{
    componentMenu:{
        data:CompItem_Menu[],
        activeItem:CompItem_Menu,
    }
}

//- 工作区
//- 工作区组件列表_组件项
export interface CompItem_Workbench{
    id:string,
    type: string,
    focus:boolean,
    args:any,
}
//- 工作区数据仓库
export interface WorkbenchListState{
    workbenchList:{
        data:CompItem_Workbench[],
        activeItem:CompItem_Workbench|null,
        length: number,
        dropStatus: boolean,
        selectList:{id:number}[]
    }
}