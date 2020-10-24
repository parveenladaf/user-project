import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { UserService } from 'src/app/user.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['name', 'address', 'mobile_no', 'email_id', 'action'];
  allData: any;
  dataSource;
  constructor(
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.getAllUser();
  }

  getAllUser() {
    this.userService.getUsers().subscribe(
      (data) => {
        if (data) {
          this.allData = data;
          this.dataSource = new MatTableDataSource(this.allData);

          this.userService.openToast('User fetch successfully', 'Close');
        }
      },
      (err) => {
        if (err['error']['message'] == undefined) {
          this.userService.openToast('Internal Server error', 'Close');
        } else {
          this.userService.openToast(err['error']['message'], 'Close');
        }
      }
    );
  }

  deletUser(user) {
    this.userService.deleteUser(user._id).subscribe(
      (data) => {
        if (data) {
          this.userService.openToast('User deleted successfully', 'Close');
          window.location.reload();
        }
      },
      (err) => {
        if (err['error']['message'] == undefined) {
          this.userService.openToast('Internal Server error', 'Close');
        } else {
          this.userService.openToast(err['error']['message'], 'Close');
        }
      }
    );
  }
}

