import {Type} from "@angular/core";
import {BurgerComponent} from "../shared/components/icons/burger/burger.component";
import {PostLinkIconComponent} from "../shared/components/icons/post-link-icon/post-link-icon.component";
import {PhoneIconComponent} from "../shared/components/icons/phone-icon/phone-icon.component";

export interface BurgerMenuLink {
  routerLink: string;
  label: string;
  icon: Type<any>;
}

export const burgerMenuLinks: BurgerMenuLink[] = [
  {routerLink: '/main/blogs-page', label: 'Blogs', icon: BurgerComponent},
  {routerLink: '/main/posts-page', label: 'Posts', icon: PostLinkIconComponent},
  {routerLink: '/main/device-page', label: 'Devices', icon: PhoneIconComponent},
  {routerLink: '/main/profile-page', label: 'Profile', icon: PhoneIconComponent},
]
