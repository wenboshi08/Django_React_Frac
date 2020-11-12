import React, {Component} from 'react';
import { Table, Input, Button, Icon } from 'antd';
import Highlighter from 'react-highlight-words';

class FlowbackTable extends Component {
    constructor() {
        super();
        this.state = {
            searchText: '',
            searchedColumn: '',
        }
    }

    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div style={{ padding: 8 }}>
            <Input
              ref={node => {
                this.searchInput = node;
              }}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
              style={{ width: 188, marginBottom: 8, display: 'block' }}
            />
            <Button
              type="primary"
              onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
              icon="search"
              size="small"
              style={{ width: 90, marginRight: 8 }}
            >
              Search
            </Button>
            <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
              Reset
            </Button>
          </div>
        ),
        filterIcon: filtered => (
          <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
          record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(() => this.searchInput.select());
          }
        },
        render: text =>
          this.state.searchedColumn === dataIndex ? (
            <Highlighter
              highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
              searchWords={[this.state.searchText]}
              autoEscape
              textToHighlight={text.toString()}
            />
          ) : (
            text
          ),
      });

    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
          searchText: selectedKeys[0],
          searchedColumn: dataIndex,
        });
      };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
      };

    render() {
        const columns = [
            {
                title: 'ID',
                dataIndex:'id',
                key: 'id',
                ...this.getColumnSearchProps('id'),
            },
            {
                title: 'Project Name',
                dataIndex:'project_name',
                key: 'project_name',
                ...this.getColumnSearchProps('project_name'),
            },
            {
                title: 'Institute',
                dataIndex:'institute',
                key: 'institute',
                ...this.getColumnSearchProps('institute'),
            },
            {
                title: 'Api Number',
                dataIndex:'api_number',
                key: 'api_number',
                ...this.getColumnSearchProps('api_number'),
            },
            {
                title: 'State Number',
                dataIndex:'state_number',
                key: 'state_number',
                ...this.getColumnSearchProps('state_number'),
            },
            {
                title: 'County Number',
                dataIndex:'county_number',
                key: 'county_number',
                ...this.getColumnSearchProps('county_number'),
            },
            {
                title: 'Well Name',
                dataIndex:'well_name',
                key: 'well_name',
                ...this.getColumnSearchProps('well_name'),
            },
            {
                title: 'Latitude',
                dataIndex:'latitude',
                key: 'latitude',
                ...this.getColumnSearchProps('latitude'),
            },
            {
                title: 'Longitude',
                dataIndex:'longitude',
                key: 'longitude',
                ...this.getColumnSearchProps('longitude'),
            },
            {
                title: 'Sample Collection Date',
                dataIndex:'sample_collection_date',
                key: 'sample_collection_date',
                ...this.getColumnSearchProps('sample_collection_date'),
            },
            {
                title: 'Compound Name',
                dataIndex:'compound_name',
                key: 'compound_name',
                ...this.getColumnSearchProps('compound_name'),
            },
            {
                title: 'Cas Number',
                dataIndex:'cas_number',
                key: 'cas_number',
                ...this.getColumnSearchProps('cas_number'),
            },
            {
                title: 'Method',
                dataIndex:'method',
                key: 'method',
                ...this.getColumnSearchProps('method'),
            },
            {
                title: 'Concentration',
                dataIndex:'concentration',
                key: 'concentration',
                ...this.getColumnSearchProps('concentration'),
            },
            {
                title: 'Standard Deviation',
                dataIndex:'standard_deviation',
                key: 'standard_deviation',
                ...this.getColumnSearchProps('standard_deviation'),
            },
            {
                title: 'Sample Upload Date',
                dataIndex:'sample_upload_date',
                key: 'sample_upload_date',
                ...this.getColumnSearchProps('sample_upload_date'),
            },
            {
                title: 'Reference',
                dataIndex:'reference',
                key: 'reference',
                ...this.getColumnSearchProps('reference'),
            },
        ];

        return (
            <Table columns={columns} dataSource={this.props.data} />
        );
    }
}

export default FlowbackTable;