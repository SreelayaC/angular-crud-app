import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../service/user.service';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert';

import { UntypedFormBuilder, FormControl, FormGroup, UntypedFormGroup, NgForm, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})
export class AddUserComponent implements OnInit {
  user:any;
  myForm:any;
  id!: number;
  isAddMode!: boolean;
  data: any;

  constructor(private fb: FormBuilder, private api:UserService, private http:HttpClient , private router: Router,private route: ActivatedRoute) {
    this.myForm = this.fb.group({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      companyName: new FormControl('', Validators.required),
      designation: new FormControl('', Validators.required),
    })
   }
  
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

    this.id = this.route.snapshot.params['id'];
    console.log(this.id)
    this.isAddMode = !this.id;
    if(!this.isAddMode){
      this.api.getuserbyid(this.id).subscribe((res) => {
        this.data=res.data
        console.log()
        this.myForm.patchValue(res.data[0])
        console.log()
        console.log(this.myForm.value)
       });
    }
  }

  onSubmit(){
    if (this.isAddMode) {
      console.log(this.myForm.value)
      this.api.createusers(this.myForm.value).subscribe((res) => {
        if (res.api_status) {

          Swal({
            title: 'submited',
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
      })
    }
    else {
      const userData = { ...this.myForm.value };
      userData.id = Number(this.id);
      this.api.updateUser(userData).subscribe((res) => {
        if (res.api_status) {
          Swal({
            title: 'Updated',
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
      })
    }

  }

  deleteClick(item: any) {
    console.log(item.id)
    if (confirm('Are you sure?')) {
      this.api.deleteUser(item.id).subscribe((res) => {
        if (res.api_status) {
          alert(res.message)
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
