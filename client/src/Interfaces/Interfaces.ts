export interface Item {
    id: string;
    item_no: string;
    description: number;
    unit: string; 
    qty:number,
    amount:number,
    rate:number,
  createdAt:Date,
  updatedAt:Date
  }
  export interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    inputType: 'number' | 'text';
    record: Item;
    index: number;
    children: React.ReactNode;
  }
  
    