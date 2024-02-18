import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Pagination } from 'src/app/models/data-models/pagination';
import { ChecklistService } from 'src/app/services/checklist.service';
import { DateQuestion, createDateQuestion } from '../form-questions/date-picker/dateQuestion';
import { DatePickerComponent } from '../form-questions/date-picker/date-picker.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { GetDateType } from 'src/app/helpers/functions/getDateTypeFn';
import { QuestionSet } from 'src/app/models/form-models/questionSet';

@Component({
  standalone: true,
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, DatePickerComponent, PaginationModule]
})
export class TableComponent implements OnInit, OnDestroy {
  table: Array<any> = [];
  pagination: Pagination | undefined;
  questions: QuestionSet[] = []
  pageNumber = 1;
  pageSize = 10;
  source: string = '';
  header: string = 'Data';

  dateForm!: FormGroup;
  minDate: Date | undefined;
  maxDate: Date | undefined;
  startDateInput: DateQuestion | undefined;
  endDateInput: DateQuestion | undefined;
  datePayload = '';
  originalDatePayload = '';
  private readonly dateSubscription = new Subscription();
  changeMadeDate = false;
  validDateRange = true;
  validDateInput = true;
  

  constructor(private checklistService: ChecklistService, private router: Router, 
      private route: ActivatedRoute) {
    if (this.questions.length > 0) this.resetComponent();
    this.source = this.route.snapshot.data['metadata']['source'];
    checklistService.getQuestions(this.source).subscribe(
        qs => this.questions = qs
    );
    this.header = this.route.snapshot.data['metadata']['header'] + ' Data';
  }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.dateSubscription.unsubscribe();
  }

  loadData() {
    var minDateParam = this.dateForm ? this.dateForm!.getRawValue().startDate : null;
    var maxDateParam = this.dateForm ? this.dateForm!.getRawValue().endDate : null;
    this.checklistService.getData(this.source, this.pageNumber, this.pageSize, minDateParam, maxDateParam).subscribe({
      next: response => {
        if (response.result && response.pagination) {
          this.table = <any[]>response.result;
          this.pagination = response.pagination;
          this.minDate = GetDateType(this.pagination.minDate);
          this.maxDate = GetDateType(this.pagination.maxDate);
          this.createDateForm();
          this.onChange();
        }
      }
    })
  }

  editEntry(row: any) {
    this.router.navigateByUrl('/checklists/'+ this.source + '/edit/' + row.id.toString());
  }

  deleteEntry(row: any) {
    this.checklistService.deleteEntry(this.source, row.id).subscribe({
      next: () => {
        // If the item is the last on the page, go to the previous page
        var p = this.pagination!;
        if ((p.currentPage == p.totalPages && p.currentPage != 1) && 
          (p.itemsPerPage - ((p.currentPage * p.itemsPerPage) % p.totalItems) == 1)) {
            this.pageNumber = this.pageNumber - 1;
            console.log(this.pageNumber)
          }
        this.loadData()
      }
    });
  }

  pageChanged(event: any) {
    if (this.pageNumber !== event.page) {
      this.pageNumber = event.page;
      this.loadData();
    }
  }

  setDateRange() {
    this.loadData();
  }

  createDateForm() {
    this.startDateInput = createDateQuestion('startDate', 'Start Date', false);
    this.endDateInput = createDateQuestion('endDate', 'End Date', false);

    this.startDateInput.value = GetDateType(this.pagination!.minDateInRange);
    this.endDateInput.value = GetDateType(this.pagination!.maxDateInRange);

    const group: any = {};

    group['startDate'] = new FormControl(this.startDateInput.value);
    group['endDate'] = new FormControl(this.endDateInput.value);

    this.dateForm = new FormGroup(group);
  }

  onChange() {
    const subscription = this.dateForm!.valueChanges.subscribe(() => {
      this.datePayload = JSON.stringify(JSON.stringify(this.dateForm!.getRawValue()));
      if (this.datePayload != this.originalDatePayload) this.changeMadeDate = true;
      else this.changeMadeDate = false;

      this.validDateInput = (this.dateForm!.getRawValue().startDate != undefined && this.dateForm!.getRawValue().endDate != undefined)
      this.validDateRange = (this.dateForm!.getRawValue().startDate <= this.dateForm!.getRawValue().endDate);
    })
    this.dateSubscription.add(subscription);
  }

  resetComponent() {
    console.log('reseting')
  //   table: Array<any> = [];
  // pagination: Pagination | undefined;
  // questions: QuestionSet[] = []
  // pageNumber = 1;
  // pageSize = 10;
  // source: string = '';
  // header: string = 'Data';

  // dateForm!: FormGroup;
  // minDate: Date | undefined;
  // maxDate: Date | undefined;
  // startDateInput: DateQuestion | undefined;
  // endDateInput: DateQuestion | undefined;
  // datePayload = '';
  // originalDatePayload = '';
  // private readonly dateSubscription = new Subscription();
  // changeMadeDate = false;
  // validDateRange = true;
  // validDateInput = true;
  }
}
