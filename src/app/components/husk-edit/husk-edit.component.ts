import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Users } from 'src/app/interfaces/users';
import { UserActiveService } from 'src/app/services/user-active.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-husk-edit',
  templateUrl: './husk-edit.component.html',
  styleUrls: ['./husk-edit.component.scss']
})
export class HuskEditComponent implements OnInit {

  editForm: FormGroup | undefined

  myUser: Users[] | undefined
  
  profile: Users | undefined

  constructor(private fb: FormBuilder, private userActiveService: UserActiveService, private usersService: UsersService, private router: Router, private activeRouter: ActivatedRoute) { 
    this.activeRouter.paramMap.subscribe((params) => {
      console.log(this.activeRouter.paramMap)
      const id = params.get('userId')
      if (id) {
        this.profile = this.usersService.getUserById(id)
        console.log(this.profile, 'logging profile')
      }
    })
  }

  ngOnInit(): void {
    this.editForm = this.fb.group( {
      name: ['', [Validators.required, Validators.maxLength(20)]], 
      location: ['', [Validators.required, Validators.maxLength(20)]],
      age: ['', [Validators.required, Validators.maxLength(3)]],
      message: ['', [Validators.required, Validators.maxLength(100)]],
      likes: [''],
      dislikes: ['']
    }),
    this.editForm.setValue({
      name: this.profile?.name, 
      location: this.profile?.location,
      age: this.profile?.age,
      message: this.profile?.message,
      likes: [''],
      dislikes: ['']
    })
    
  }


  onSubmit(): void {
    const user: Users = {
      ...this.editForm?.value, 
      id: this.profile?.id
    }
      this.usersService.editUser(user)
      this.router.navigate(['/profile', this.profile?.id])
  }
  


  get name() {
    return this.editForm?.get("name")
  }

  get age() {
    // this.editForm?.controls['name'].setValue(this.profile?.age)
    return this.editForm?.get("age")
  }

  get location() {
    // this.editForm?.controls['name'].setValue(this.profile?.location)
    return this.editForm?.get("location")
  }

  get message() {
    // this.editForm?.controls['name'].setValue(this.profile?.message)
    return this.editForm?.get("message")
  }
  
}
