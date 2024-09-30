import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../service/user.service';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert';
import { UntypedFormBuilder, FormControl, FormGroup, UntypedFormGroup, NgForm, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-get-user',
  templateUrl: './get-user.component.html',
  styleUrl: './get-user.component.scss'
})
export class GetUserComponent implements OnInit{
  user: any;

  constructor(private fb: FormBuilder, private api:UserService, private http:HttpClient , private router: Router,private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.api.getAllUsers().subscribe((res)=>{
    if (res){
     this.user=res.data
     console.log("res",this.user);
    }
    else{
      Swal({
        title: 'Server Error',
        text: res.message,
        icon: 'error'
      })
    }
    });

  }

  
  deleteClick(item: any) {
    console.log(item.id)
    if (confirm('Are you sure?')) {
      this.api.deleteUser(item.id).subscribe((res) => {
        if (res.api_status) {
          Swal({
            title: '',
            text: res.message,
            icon: 'success'
          })
        }
        else {
          Swal({
            title: 'Server Error',
            text: res.message,
            icon: 'error'
          })
        }

      }

      )
    }

  }

}
