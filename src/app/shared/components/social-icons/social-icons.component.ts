import { Component, Input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialPlatform } from '../../models/types';

@Component({
  selector: 'app-social-icons',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './social-icons.component.html',
  styleUrl: './social-icons.component.scss'
})
export class SocialIconsComponent {
  @Input() platform: SocialPlatform = SocialPlatform.LINKEDIN;
  @Input() url: string = '';

  protected readonly Platforms = SocialPlatform;

  /** Maps each platform to its SVG file in assets/svg (note exact casing/hyphenation). */
  private static readonly ICON_FILES: Record<SocialPlatform, string> = {
    [SocialPlatform.FACEBOOK]: 'Facebook.svg',
    [SocialPlatform.PINTEREST]: 'Pinterest.svg',
    [SocialPlatform.TWITTER]: 'Twitter.svg',
    [SocialPlatform.LINKEDIN]: 'Linked-In.svg',
    [SocialPlatform.GOOGLE]: 'Google.svg'
  };

  protected iconSrc = computed(() => `assets/svg/${SocialIconsComponent.ICON_FILES[this.platform]}`);

  protected linkClasses = computed(() => {
    let hoverColor = '';

    switch (this.platform) {
      case SocialPlatform.FACEBOOK:
        hoverColor = 'hover:border-[#1877F2]';
        break;
      case SocialPlatform.PINTEREST:
        hoverColor = 'hover:border-[#BD081C]';
        break;
      case SocialPlatform.TWITTER:
        hoverColor = 'hover:border-[#1DA1F2]';
        break;
      case SocialPlatform.LINKEDIN:
        hoverColor = 'hover:border-[#0A66C2]';
        break;
      case SocialPlatform.GOOGLE:
        hoverColor = 'hover:border-[#DB4437]';
        break;
    }

    return `inline-flex items-center justify-center w-[46px] h-[46px] rounded-[11px] border border-[#e7e8f0] bg-white transition-all duration-200 ${hoverColor} cursor-pointer`;
  });
}
