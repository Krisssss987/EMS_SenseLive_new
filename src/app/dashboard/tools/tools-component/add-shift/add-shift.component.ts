import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription, combineLatest } from 'rxjs';
import { DashboardService } from 'src/app/dashboard/dash_service/dashboard.service';
import { AuthService } from 'src/app/authentication/auth/auth.service';

@Component({
  selector: 'app-add-shift',
  templateUrl: './add-shift.component.html',
  styleUrls: ['./add-shift.component.css']
})
export class AddShiftComponent implements OnInit,OnDestroy {

  shiftName = new FormControl('', [Validators.required]);
  startTime = new FormControl('', [Validators.required]);
  endTime = new FormControl('', [Validators.required]);
  timeDifference: string = '';

  private formSubscription!: Subscription;

  ngOnDestroy() {
    // Unsubscribe from the value changes when the component is destroyed
    this.formSubscription.unsubscribe();
  }

  private subscribeToFormChanges() {
    // CombineLatest allows us to react to changes in both controls
    return combineLatest([this.startTime.valueChanges, this.endTime.valueChanges])
      .subscribe(() => this.calculateTimeDifference());
  }

  calculateTimeDifference() {
    const startTimeValue = this.startTime.value as string;
    const endTimeValue = this.endTime.value as string;
  
    if (startTimeValue && endTimeValue) {
      const startTimeArray = startTimeValue.split(':');
      const endTimeArray = endTimeValue.split(':');
  
      const startHours = parseInt(startTimeArray[0]);
      const startMinutes = parseInt(startTimeArray[1]);
  
      const endHours = parseInt(endTimeArray[0]);
      const endMinutes = parseInt(endTimeArray[1]);
  
      if ((startHours > endHours) || (startHours === endHours && startMinutes > endMinutes)) {
        // Handle case where end time is earlier than start time
        const differenceInMinutes = (endHours * 60 + endMinutes) + (24 * 60 - (startHours * 60 + startMinutes));
        this.displayTimeDifference(differenceInMinutes);
      } else {
        const differenceInMinutes = (endHours * 60 + endMinutes) - (startHours * 60 + startMinutes);
        this.displayTimeDifference(differenceInMinutes);
      }
    } else {
      this.timeDifference = 'Invalid time values';
    }
  }
  
  displayTimeDifference(differenceInMinutes: number) {
    if (!isNaN(differenceInMinutes)) {
      const hours = Math.floor(differenceInMinutes / 60);
      const minutes = differenceInMinutes % 60;
      this.timeDifference = `${this.padZero(hours)} hours ${this.padZero(minutes)} minutes`;
    } else {
      this.timeDifference = 'Invalid time values';
    }
  }

  // Helper function to pad a number with a leading zero if needed
  private padZero(num: number): string {
    return num < 10 ? `0${num}` : num.toString();
  }
  

  @HostListener('window:resize')
  onWindowResize() {
    this.adjustDialogWidth();
  }

  ngOnInit(): void {
    this.formSubscription = this.subscribeToFormChanges();
  }

  constructor(
    private DashDataService: DashboardService,
    private authService: AuthService,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AddShiftComponent>,
  ) {}

  
  adjustDialogWidth() {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 600) {
      this.dialogRef.updateSize('90%', '');
    } else if (screenWidth <= 960) {
      this.dialogRef.updateSize('70%', '');
    } else {
      this.dialogRef.updateSize('400px', '');
    }
  }

  onNoClick(){
    this.dialogRef.close();
  }

  onSaveClick(){
    if( this.shiftName.valid && this.startTime.valid && this.endTime.valid )
    {
      const CompanyId = this.authService.getCompanyId();

      const shiftData = {
        shiftName:this.shiftName.value, 
        startTime:this.startTime.value, 
        endTime:this.endTime.value, 
        totalDuration:this.timeDifference,
        companyId:CompanyId
      }

      this.DashDataService.shiftAdd(shiftData).subscribe(
        (response) => {
          this.snackBar.open(
            'Shift Added Successfully.',
            'Dismiss',
            { duration: 2000 }
          );
        },
        (error) => {
          this.snackBar.open(
            error.error.message || 'Failed! Please try again.',
            'Dismiss',
            { duration: 2000 }
          );
        }
      );

    this.dialogRef.close();
    }else{
      this.snackBar.open('Error sending Shift Data!', 'Dismiss', {
        duration: 2000
      });
    }    
  }
  
}
