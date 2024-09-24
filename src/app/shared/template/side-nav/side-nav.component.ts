import { Component  } from '@angular/core';
import { AdminRoutes, ClienteRoutes, MercaderiaRoutes, SupervisorRoutes } from './side-nav-routes.config';
import { ThemeConstantService } from '../../services/theme-constant.service';
import { UserModel } from 'src/app/models/auth/user-model.models';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-sidenav',
    templateUrl: './side-nav.component.html'
})

export class SideNavComponent{

    user?:UserModel;
    public menuItems: any[]
    isFolded : boolean;
    isSideNavDark : boolean;
    isExpand : boolean;

    constructor( private themeService: ThemeConstantService,
        private authService: AuthService,) {}

    ngOnInit(): void {
        //this.menuItems = AdminRoutes.filter(menuItem => menuItem);
        this.themeService.isMenuFoldedChanges.subscribe(isFolded => this.isFolded = isFolded);
        this.themeService.isExpandChanges.subscribe(isExpand => this.isExpand = isExpand);
        this.themeService.isSideNavDarkChanges.subscribe(isDark => this.isSideNavDark = isDark);

        this.authService.user()
        .subscribe({
            next:(response) =>{
                this.user = response;
            }
        });
        this.user = this.authService.getUser();
        console.log('Usuario!',this.user);
        if(this.user.roles.includes('Administrador')){ this.menuItems = [...AdminRoutes]; }
        if(this.user.roles.includes('Ventanilla')){ this.menuItems = [...AdminRoutes]; }
        if(this.user.roles.includes('Resonsable de farmacia')){ this.menuItems = [...AdminRoutes]; }

        if(this.user.roles.includes('Mercaderia')){ this.menuItems = [...MercaderiaRoutes] }
        if(this.user.roles.includes('Cliente')){ this.menuItems = [...ClienteRoutes] }
        if(this.user.roles.includes('Supervisor')){ this.menuItems = [...SupervisorRoutes] }
        
    }

    ngAfterViewInit(): void{
        /* Collapsed Menu dropdown */
        let submenus = document.querySelectorAll('.ant-menu li.ant-menu-submenu');
        let direction = document.querySelector('html').getAttribute('dir');
        submenus.forEach(item => {
            item.addEventListener('mouseover', function () {
                let menuItem = this;
                let menuItemRect = menuItem.getBoundingClientRect();
                let submenuWrapper = menuItem.querySelector('ul.ant-menu-sub');
                submenuWrapper.style.top = `${menuItemRect.top}px`;
                if (direction === 'ltr') {
                    submenuWrapper.style.left = `${menuItemRect.left + Math.round(menuItem.offsetWidth * 0.75) + 10}px`;
                } else if (direction === 'rtl') {
                    submenuWrapper.style.right = `${Math.round(menuItem.offsetWidth * 0.75) + 10}px`;
                }
            })
        });
    }

    closeMobileMenu(): void {
        if (window.innerWidth < 992) {
            this.isFolded = false;
            this.isExpand = !this.isExpand;
            this.themeService.toggleExpand(this.isExpand);
            this.themeService.toggleFold(this.isFolded);
        }
    }
}
