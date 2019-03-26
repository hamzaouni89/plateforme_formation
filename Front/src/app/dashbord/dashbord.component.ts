import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { Http } from '@angular/http';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent implements OnInit {
  http: Http;
  Coachs: any;
  constructor(private userService: UserService) { }

  ngOnInit() {

  }





}
