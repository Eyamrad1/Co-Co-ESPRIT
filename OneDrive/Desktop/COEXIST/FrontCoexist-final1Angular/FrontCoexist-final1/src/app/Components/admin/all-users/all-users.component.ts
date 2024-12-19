import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../Services/user.service";
import {UserModel} from "../../../entity/User.model";
import {Router} from "@angular/router";
import {AuthService} from "../../../Services/auth.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Event} from "../../../entity/Event";
import {Product} from "../../../entity/Product";

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {

  users: UserModel[] = [];
    keyword: string = '';
  currentPage: number = 1;
  pageSize: number = 3; // Number of events per page
  pagedProducts: UserModel[] = [];
  itemsPerPage = 3; // Set your desired items per page
  p:number;
  constructor( private authservice: AuthService, private router: Router,private userservice: UserService) { }

  ngOnInit() {
      this.getAllUser();
    }

  setPage(pageNumber: number): void {
    const startIndex = (pageNumber - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedProducts = this.users.slice(startIndex, endIndex);
    this.currentPage = pageNumber;
    console.log('Current Page:', this.currentPage);
    console.log('Paged Events:', this.pagedProducts);
  }

  onPrevPage(): void {
    if (this.currentPage > 1) {
      this.setPage(this.currentPage - 1);
    }
  }

  onNextPage(): void {
    if (this.currentPage < this.totalPages()) {
      this.setPage(this.currentPage + 1);
    }
  }

  totalPages(): number {
    return Math.ceil(this.users.length / this.pageSize);
  }
  //}
    //this.getAllUsers();


 /* getAllUsers(){
    this.userService.getAllUser().subscribe(
      data => {
      this.getAllUser = data;
    }
    );
  }*/


getAllUser(){
  // Call the service to get the list of events
  this.userservice.getAllUser().subscribe(
    data => {
      this.users = data;
    },
    error => {
      console.error('Error loading events', error);
      // Handle error appropriately, show a message to the user, etc.
    }
  );
}
    deleteUser(id: number): void {
        this.authservice.deleteUser(id).subscribe(
            (response: any) => {
                console.log("User deleted successfully: ", response);
                this.userservice.getAllUser();
                alert("Do you want to delete definitive this user !")
                window.location.reload();
            },
            (error) => {
                console.log("Error deleting meeting: ", error);
                // Handle non-JSON response (e.g., plain text)
                if (error instanceof HttpErrorResponse && error.error instanceof ProgressEvent) {
                    console.log("Non-JSON response: ", error.error);
                } else {
                    console.log("JSON response: ", error.error);

                }
            }
        );
    }
    search(): void {
        this.authservice.searchUsers(this.keyword).subscribe(
            (data: UserModel[]) => {
                // Update image URLs for each event in the search results
                //const baseUrl = 'http://localhost:8000/COEXIST/api/v1/file/images/{imageName:.+}'; // Change this to your actual base URL
                this.users = data.map(user => ({
                  ...user,
                 // imageUrl: baseUrl + user.image
                }));


            },
            (error) => {
                console.log('Error occurred while searching for users:', error);
            }
        );
    }

    verifier(user: UserModel): void {
        this.authservice.activateUser(user.userId).subscribe(
            () => {

                console.log('Utilisateur activé avec succès.');
                this.getAllUser();
                alert("this user is Activated !");
              window.location.reload();
            },
            (error) => {
                console.error('Une erreur s\'est produite lors de l\'activation :', error);
                // Gérer l'erreur d'activation
            }
        );
    }

    bloqueUser(user: UserModel): void {
        this.authservice.bloquerUser(user.email).subscribe(
            () => {

                console.log('Utilisateur activé avec succès.');
                this.getAllUser();
                alert("this user is blocked!");
                window.location.reload();
                // user.valid=true;
                // Faire quelque chose après l'activation réussie
            },
            (error) => {
                console.error('Une erreur s\'est produite lors de l\'activation :', error);
            }
        );
    }


}


