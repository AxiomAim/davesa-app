export interface TreeTableColumn {
  name: string;
  dataKey: any;
  position?: "right" | "left";
  pipe?: any;
  isSortable?: boolean;
  format?: any;
  flexGrow?: any;
  isUrl?: boolean;
  isTooltip?: boolean;
  colorColumnName?: string;
  colorBasedOnColumn?: string;
  isIcon?: boolean;
  iconColor?: string;
  width?: number;
  visible?: boolean;
  type?: string;
}
