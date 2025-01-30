import { useState, useRef } from 'react'
import useData from './utils/supabase'
import { FilterMatchMode, FilterOperator } from 'primereact/api'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { InputText } from 'primereact/inputtext'
import { Toast } from 'primereact/toast'
import './App.css'
import { Tag } from 'primereact/tag'
import { Button } from 'primereact/button'

const App = () => {
  const profiles = useData()
  const [globalFilter, setGlobalFilter] = useState(null)
  const [expandedRows, setExpandedRows] = useState(null)
  const toast = useRef(null)
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  });
  
  const imageBodyTemplate = (profile) => {
    return <img src={profile.imgUrl} alt={`A profile picture of ${profile.name}`} className="w-6rem shadow-2 border-round" />;
  };

  const profileBodyTemplate = (profile) => {
    return <a href={profile.profileUrl} target='_blank'>{profile.name}</a>;
  };

  const allowExpansion = (rowData) => {
    return rowData.name.length > 0;
  };

  const rowExpansionTemplate = (profile) => {
    return (
        <div className="p-3">
            <h5>Profile summary for {profile.name}</h5>
            <DataTable value={profile}>
                <Column field="profileUrl" header="Profile Summary" body={profileBodyTemplate} sortable></Column>
            </DataTable>
        </div>
    );
  };

  const onRowExpand = (event) => {
    // toast.current.show({ severity: 'info', summary: 'Product Expanded', detail: event.name, life: 3000 });
};

const onRowCollapse = (event) => {
  // toast.current.show({ severity: 'success', summary: 'Product Collapsed', detail: event.name, life: 3000 });
};

const expandAll = () => {
// let _expandedRows = {};

// profiles.forEach((p) => (_expandedRows[`${p.id}`] = true));

// setExpandedRows(_expandedRows);
};

const collapseAll = () => {
// setExpandedRows(null);
};

// const columns = [
//   {field: 'imgUrl', header: ''},
//   {field: 'rank', header: 'Rank'},
//   {field: 'name', header: 'Name'},
//   {field: 'net_worth', header: 'Net Worth'},
//   {field: 'age', header: 'Age'},
//   {field: 'origin_of_wealth', header: 'Origin of Wealth'},
//   {field: 'country_of_origin', header: 'Country of Origin'},
// ];


  // const header = (
  //   <div className="flex flex-wrap justify-content-end gap-2">
  //       <Button icon="pi pi-plus" label="Expand All" onClick={expandAll} text />
  //       <Button icon="pi pi-minus" label="Collapse All" onClick={collapseAll} text />
  //   </div>
  // );

  return (
    <>
      <Tag />
      <h1>Africa's Billionaires</h1>
      <DataTable
        value={profiles}
        tableStyle={{ minWidth: '60rem' }}
        reorderableColumns
        globalFilterFields={['imgUrl', 'rank', 'name', 'net_worth', 'age', 'origin_of_wealth', 'country_of_origin', 'profileUrl']}
        filterDisplay="row"
        showGridlines
        // rowExpansionTemplate={rowExpansionTemplate}
        // expandedRows={expandedRows}
        // onRowToggle={(e) => setExpandedRows(e.data)}
        // onRowExpand={onRowExpand}
        // onRowCollapse={onRowCollapse}
        // dataKey="id" header={header}
      >
        <Column style={{ width: '5rem'}}  />
        <Column 
          field="imgUrl" 
          header=""
          body={imageBodyTemplate}
        >
        </Column>
        <Column field="rank" header="Rank" sortable > </Column>
        <Column field="name" header="Name" sortable body={profileBodyTemplate} >
          <InputText
            type="search"
            onInput={(e) => setGlobalFilter(e.target.value)}
            class="p-column-filter"
            placeholder="Search by name"
          />
        </Column>
        <Column field="net_worth" header="Net Worth" sortable> </Column>
        <Column field="age" header="Age" sortable> </Column>
        <Column field="origin_of_wealth" header="Origin of Wealth" sortable> </Column>
        <Column field="country_of_origin" header="Country of Origin" sortable> </Column>
      </DataTable>
    </>
  )
}

export default App
