<template>
  <div class="content">
    <div class="col-md-8 ml-auto mr-auto">
      <h2 class="text-center">Paginated Tables</h2>
      <p class="text-center">
        With a selection of custom components & and Element UI components, you can built beautiful data tables. For more
        info check
        <a href="http://element.eleme.io/#/en-US/component/table" target="_blank">Element UI Table</a>
      </p>
    </div>
    <div class="row mt-5">
      <div class="col-12">
        <card card-body-classes="table-full-width">
          <h4 slot="header" class="card-title">Paginated Tables</h4>
          <div>
            <div class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap">
              <el-select
                v-model="pagination.perPage"
                class="select-primary mb-3 pagination-select"
                placeholder="Per page"
              >
                <el-option
                  v-for="item in pagination.perPageOptions"
                  :key="item"
                  class="select-primary"
                  :label="item"
                  :value="item"
                >
                </el-option>
              </el-select>

              <base-input>
                <el-input
                  v-model="searchQuery"
                  type="search"
                  class="mb-3 search-input"
                  clearable
                  prefix-icon="el-icon-search"
                  placeholder="Search records"
                  aria-controls="datatables"
                >
                </el-input>
              </base-input>
            </div>
            <el-table :data="queriedData">
              <el-table-column
                v-for="column in tableColumns"
                :key="column.label"
                :min-width="column.minWidth"
                :prop="column.prop"
                :label="column.label"
              >
              </el-table-column>
              <el-table-column :min-width="135" align="right" label="Actions">
                <div slot-scope="props">
                  <base-button
                    class="like btn-link"
                    type="info"
                    size="sm"
                    icon
                    @click.native="handleLike(props.$index, props.row)"
                  >
                    <i class="tim-icons icon-heart-2"></i>
                  </base-button>
                  <base-button
                    class="edit btn-link"
                    type="warning"
                    size="sm"
                    icon
                    @click.native="handleEdit(props.$index, props.row)"
                  >
                    <i class="tim-icons icon-pencil"></i>
                  </base-button>
                  <base-button
                    class="remove btn-link"
                    type="danger"
                    size="sm"
                    icon
                    @click.native="handleDelete(props.$index, props.row)"
                  >
                    <i class="tim-icons icon-simple-remove"></i>
                  </base-button>
                </div>
              </el-table-column>
            </el-table>
          </div>
          <div slot="footer" class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap">
            <div class="">
              <p class="card-category"> Showing {{ from + 1 }} to {{ to }} of {{ total }} entries </p>
            </div>
            <BasePagination
              v-model="pagination.currentPage"
              class="pagination-no-border"
              :per-page="pagination.perPage"
              :total="total"
            >
            </BasePagination>
          </div>
        </card>
      </div>
    </div>
  </div>
</template>
<script>
  import { Table, TableColumn, Select, Option } from 'element-ui';
  import Fuse from 'fuse.js';
  import swal from 'sweetalert2';
  import users from '../../util/mock-users';
  import { BasePagination } from '@/components';

  export default {
    name: 'Paginated',
    components: {
      BasePagination,
      [Select.name]: Select,
      [Option.name]: Option,
      [Table.name]: Table,
      [TableColumn.name]: TableColumn,
    },
    data() {
      return {
        pagination: {
          perPage: 5,
          currentPage: 1,
          perPageOptions: [5, 10, 25, 50],
          total: 0,
        },
        searchQuery: '',
        propsToSearch: ['name', 'email', 'age'],
        tableColumns: [
          {
            prop: 'name',
            label: 'Name',
            minWidth: 200,
          },
          {
            prop: 'email',
            label: 'Email',
            minWidth: 250,
          },
          {
            prop: 'age',
            label: 'Age',
            minWidth: 100,
          },
          {
            prop: 'salary',
            label: 'Salary',
            minWidth: 120,
          },
        ],
        tableData: users,
        searchedData: [],
        fuseSearch: null,
      };
    },
    computed: {
      /***
       * Returns a page from the searched data or the whole data. Search is performed in the watch section below
       */
      queriedData() {
        let result = this.tableData;
        if (this.searchedData.length > 0) {
          result = this.searchedData;
        }
        return result.slice(this.from, this.to);
      },
      to() {
        let highBound = this.from + this.pagination.perPage;
        if (this.total < highBound) {
          highBound = this.total;
        }
        return highBound;
      },
      from() {
        return this.pagination.perPage * (this.pagination.currentPage - 1);
      },
      total() {
        return this.searchedData.length > 0 ? this.searchedData.length : this.tableData.length;
      },
    },
    watch: {
      /**
       * Searches through the table data by a given query.
       * NOTE: If you have a lot of data, it's recommended to do the search on the Server Side and only display the results here.
       * @param value of the query
       */
      searchQuery(value) {
        let result = this.tableData;
        if (value !== '') {
          result = this.fuseSearch.search(this.searchQuery);
        }
        this.searchedData = result;
      },
    },
    mounted() {
      // Fuse search initialization.
      this.fuseSearch = new Fuse(this.tableData, {
        keys: ['name', 'email'],
        threshold: 0.3,
      });
    },
    methods: {
      handleLike(index, row) {
        swal({
          title: `You liked ${row.name}`,
          buttonsStyling: false,
          type: 'success',
          confirmButtonClass: 'btn btn-success btn-fill',
        });
      },
      handleEdit(index, row) {
        swal({
          title: `You want to edit ${row.name}`,
          buttonsStyling: false,
          confirmButtonClass: 'btn btn-info btn-fill',
        });
      },
      handleDelete(index, row) {
        swal({
          title: 'Are you sure?',
          text: `You won't be able to revert this!`,
          type: 'warning',
          showCancelButton: true,
          confirmButtonClass: 'btn btn-success btn-fill',
          cancelButtonClass: 'btn btn-danger btn-fill',
          confirmButtonText: 'Yes, delete it!',
          buttonsStyling: false,
        }).then(result => {
          if (result.value) {
            this.deleteRow(row);
            swal({
              title: 'Deleted!',
              text: `You deleted ${row.name}`,
              type: 'success',
              confirmButtonClass: 'btn btn-success btn-fill',
              buttonsStyling: false,
            });
          }
        });
      },
      deleteRow(row) {
        const indexToDelete = this.tableData.findIndex(tableRow => tableRow.id === row.id);
        if (indexToDelete >= 0) {
          this.tableData.splice(indexToDelete, 1);
        }
      },
    },
  };
</script>
<style>
  .pagination-select,
  .search-input {
    width: 200px;
  }
</style>
