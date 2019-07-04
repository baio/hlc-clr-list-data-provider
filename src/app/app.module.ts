import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { TableComponent } from './planets-table.component';
import { AppComponent } from './app.component';
import { SWAPIService } from './swapi.service';
import { HttpClientModule } from '@angular/common/http';

import { ClrDatagridStateInterface } from '@clr/angular';
import {
    HlcClrTableModule,
    HLC_CLR_TABLE_DATA_PROVIDER_CONFIG,
    HLC_CLR_TABLE_PAGINATOR_ITEMS,
    PaginatorItems,
    Table,
    TableDataProviderConfig
} from '@ng-holistic/clr-list';

import { AppModels } from './app.models';


const tableDataProviderConfig: TableDataProviderConfig = {
    // map component model to app domain model for requests
    mapState(state: ClrDatagridStateInterface): any {
        const page = state.page && state.page.from / state.page.size + 1;
        return {
            page
        } as AppModels.ListRequest;
    },
    // map app domain response object to component model object
    mapResult(result: any): Table.Data.Result {
        const response = result as AppModels.ListResponse<any>;
        return {
            rows: response.items,
            paginator: {
                pageIndex: response.page,
                pageSize: 10,
                length: response.totalCount
            }
        };
    }
};

@NgModule({
  imports: [ BrowserModule, HttpClientModule, HlcClrTableModule.forRoot() ],
  declarations: [ AppComponent, TableComponent ],
  bootstrap:    [ AppComponent ],
  providers: [
        SWAPIService,
        {
            provide: HLC_CLR_TABLE_DATA_PROVIDER_CONFIG,
            useValue: tableDataProviderConfig
        }
  ]
})
export class AppModule { }
