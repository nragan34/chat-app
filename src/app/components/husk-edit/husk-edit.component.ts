import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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

  constructor(private fb: FormBuilder, private usersService: UsersService, private router: Router, private activeRouter: ActivatedRoute) { 
    this.activeRouter.paramMap.subscribe((params) => {
      const id = params.get('userId')
      if (id) {
        this.profile = this.usersService.getUserById(id)
      }
    })
  }

  ngOnInit(): void {
    this.editForm = new FormGroup({
      name: new FormControl(this.profile?.name, [Validators.required, Validators.maxLength(20)]), 
      location: new FormControl(this.profile?.location, [Validators.required, Validators.maxLength(50)]),
      age: new FormControl(this.profile?.age, [Validators.required, Validators.maxLength(3)]),
      message: new FormControl(this.profile?.message, [Validators.required, Validators.maxLength(100)]),
      likes: new FormArray(
        this.profile?.likes?.split(', ').map(like => new FormControl(like)) || [new FormControl('')], Validators.required
      ),
      dislikes: new FormArray(
        this.profile?.dislikes?.split(', ').map(dislike => new FormControl(dislike)) || [new FormControl('')], Validators.required
      )
    })
  }

  onSubmit(): void {
    if (this.likes.value === '' ) {

    }
    const user: Users = {
      ...this.editForm?.value, 
      id: this.profile?.id,
      likes: this.likes.value.filter(e =>  e?.trim()).join(", "),
      dislikes: this.dislikes.value.filter(e =>  e?.trim()).join(", ")
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

  get likes() {
    return this.editForm?.get("likes") as FormArray
  }

  get dislikes() {
    return this.editForm?.get("dislikes") as FormArray
  }

  addLike() {
    const like = new FormControl()
    this.likes.push(like)
  }

  addDislike() {
    const dislike = new FormControl()
    this.dislikes.push(dislike)
  }

  deleteLike(i: number) {
    this.likes.removeAt(i)
  }

  deleteDislike(i: number) {
    this.dislikes.removeAt(i)
  }

  
}
