import { Component, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSidenavModule} from '@angular/material/sidenav';
import { SideNavComponent } from '../../../../shared/components/side-nav/side-nav.component';
import { Router, RouterOutlet } from '@angular/router';
import { SubmoduleResponse, UserParams } from '../../../../shared/interfaces/nav-menu-interface';

@Component({
  selector: 'app-dashboard-main',
  standalone: true,
  imports: [
    SideNavComponent,
    MatSidenavModule, 
    MatCheckboxModule, 
    FormsModule, 
    MatButtonModule,
    RouterOutlet,
  ],
  templateUrl: './dashboard-main.component.html',
  styleUrl: './dashboard-main.component.css'
})
export class DashboardMainComponent implements OnInit {
  events: string[] = [];
  opened: boolean = false;
  public userParams: any = [];
  public navMenu1: UserParams[] = [];

  shouldRun = /(^|.)(stackblitz|webcontainer).(io|com)$/.test(window.location.host);

  constructor(
    private router: Router,
  ) { }


  ngOnInit(): void {
    this.userParams = localStorage.getItem('userParams');
    this.userParams = atob(this.userParams);
    this.userParams = JSON.parse(this.userParams);
    console.log (this.userParams);

    // this.navMenu.label = 'Modulos Habilitados'
    this.navMenu1 = this.userParams.map((item: UserParams): UserParams => ({
      moduleDescription: item.moduleDescription,
      moduleName: item.moduleName,
      moduleIcon: item.moduleIcon,
      moduleRoute: item.moduleRoute,
      isExpanded: false,
      submodules: item.submodules?.map((child: SubmoduleResponse): SubmoduleResponse => ({
        submoduleName: child.submoduleName,
        submoduleIcon: child.submoduleIcon,
        submoduleDescription: child.submoduleDescription,
        submoduleRoute: `${item.moduleRoute}${child.submoduleRoute}`,
        submoduleItems: child.submoduleItems
      }))
    }));

  }
}
