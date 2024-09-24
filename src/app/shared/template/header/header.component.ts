import { Component } from '@angular/core';
import { ThemeConstantService } from '../../services/theme-constant.service';
import messages from '../../../../assets/data/global/header/messages.json';
import notification from '../../../../assets/data/global/header/notification.json';
import authorMenu from '../../../../assets/data/global/header/author-menu.json';
import settings from '../../../../assets/data/global/header/settings.json';
import { AuthService } from '../../../services/auth.service';
import { UserModel } from 'src/app/models/auth/user-model.models';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})

export class HeaderComponent{

    user?:UserModel;
    searchVisible : boolean = false;
    quickViewVisible : boolean = false;
    isFolded : boolean;
    isExpand : boolean;
    appMessages = messages.appMessages;
    appNotification = notification.appNotification;
    appAuthorMenu = [
        /*
        {
        "label": "Perfil",
        "icon": "user",
        "url": "javascript:void(0);"
      },
      {
        "label": "Ajustes",
        "icon": "settings",
        "url": "javascript:void(0);"
      }
      */
    ];
    appSettings = settings.appSettings;

    constructor( 
        private themeService: ThemeConstantService,
        private authService: AuthService,
        private router: Router
        ) {}

    signOut(): void {
      this.authService.logout();
      this.router.navigateByUrl('/');
    }

    ngOnInit(): void {
        this.themeService.isMenuFoldedChanges.subscribe(isFolded => this.isFolded = isFolded);
        this.themeService.isExpandChanges.subscribe(isExpand => this.isExpand = isExpand);
        this.authService.user()
        .subscribe({
            next:(response) =>{
                this.user = response;
            }
        });
        this.user = this.authService.getUser();
    }

    toggleFold() {
        this.isFolded = !this.isFolded;
        this.themeService.toggleFold(this.isFolded);
    }

    toggleExpand() {
        this.isFolded = false;
        this.isExpand = !this.isExpand;
        this.themeService.toggleExpand(this.isExpand);
        this.themeService.toggleFold(this.isFolded);
    }

    searchToggle(): void {
        this.searchVisible = !this.searchVisible;
    }

    quickViewToggle(): void {
        this.quickViewVisible = !this.quickViewVisible;
    }
}
