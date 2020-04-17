const strsModules = `MatBadgeModule,
MatBottomSheetModule,
MatButtonModule,
MatButtonToggleModule,
MatCardModule,
MatCheckboxModule,
MatChipsModule,
MatDatepickerModule,
MatDialogModule,
MatDividerModule,
MatExpansionModule,
MatGridListModule,
MatIconModule,
MatInputModule,
MatListModule,
MatMenuModule,
MatNativeDateModule,
MatPaginatorModule,
MatProgressBarModule,
MatProgressSpinnerModule,
MatRadioModule,
MatRippleModule,
MatSelectModule,
MatSidenavModule,
MatSliderModule,
MatSlideToggleModule,
MatSnackBarModule,
MatSortModule,
MatStepperModule,
MatTableModule,
MatTabsModule,
MatToolbarModule,
MatTooltipModule,
MatTreeModule,`;
//import {MatAutocompleteModule} from '@angular/material/autocomplete';

const modules = strsModules.split('\n');
for (module of modules) {
  const m = module.substr(0, module.length -1);
  const n = m.substr(3, m.length - 'Module'.length - 3);
  console.log(`import {${m}} from '@angular/material/${n.toLowerCase()}';`);
}
