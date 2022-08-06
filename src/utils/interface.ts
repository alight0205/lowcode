
//- 组件列表区
//- 组件列表_组件项
export interface CompItem_Menu {
    type: string,
    name: string,
    args: any,
}
//- 组件列表数据仓库
export interface ComponentMenuState{
    componentMenu:{
        data:CompItem_Menu[],
    }
}

//- 工作区
//- 工作区组件列表_组件项
export interface CompItem_Workbanch{
    id:number,
    type: string,
    args:any,
}
//- 工作区数据仓库
export interface WorkbanchListState{
    workbanchList:{
        data:CompItem_Workbanch[],
        activeItem:CompItem_Workbanch
    }
}
