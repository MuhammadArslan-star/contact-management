import { Component, Input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarStyle } from '../../models/types';

@Component({
  selector: 'app-user-avatar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-avatar.component.html',
  styleUrl: './user-avatar.component.scss'
})
export class UserAvatarComponent {
  @Input() style: AvatarStyle = AvatarStyle.LIST;
  @Input() imageUrl: string | null = null;
  @Input() name: string = '';
  @Input() status: 'online' | 'offline' | 'away' | null = null;

  protected imageError = false;
  protected readonly AvatarStyles = AvatarStyle;

  protected handleImageError() {
    this.imageError = true;
    this.imageUrl = null;
  }

  protected initials = computed(() => {
    if (!this.name) return '?';
    const parts = this.name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0][0].toUpperCase();
  });

  protected containerClasses = computed(() => {
    const base = 'relative flex items-center justify-center flex-shrink-0';
    if (this.style === AvatarStyle.DETAIL) {
      return `${base} w-[128px] h-[120px] rounded-[25px]`;
    }
    return `${base} w-10 h-10 rounded-[10px]`;
  });

  protected imageClasses = computed(() => {
    if (this.style === AvatarStyle.DETAIL) {
      return 'w-full h-full object-cover rounded-[25px]';
    }
    return 'w-full h-full object-cover rounded-[10px]';
  });

  protected fallbackClasses = computed(() => {
    const gradients = [
      'bg-gradient-to-br from-indigo-500 to-purple-600',
      'bg-gradient-to-br from-blue-500 to-cyan-600',
      'bg-gradient-to-br from-emerald-500 to-teal-600',
      'bg-gradient-to-br from-amber-500 to-rose-600',
      'bg-gradient-to-br from-pink-500 to-violet-600',
      'bg-gradient-to-br from-teal-500 to-sky-600'
    ];
    let hash = 0;
    for (let i = 0; i < this.name.length; i++) {
      hash = this.name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % gradients.length;
    
    const rounded = this.style === AvatarStyle.DETAIL ? 'rounded-[25px]' : 'rounded-[10px]';
    return `w-full h-full flex items-center justify-center text-white font-medium ${rounded} ${gradients[index]}`;
  });

  protected fallbackTextClasses = computed(() => {
    return this.style === AvatarStyle.DETAIL ? 'text-2xl font-bold' : 'text-sm font-semibold';
  });

  protected statusClasses = computed(() => {
    let colorClass = 'bg-slate-400';
    if (this.status === 'online') colorClass = 'bg-[#4caf50]';
    if (this.status === 'away') colorClass = 'bg-amber-500';
    if (this.status === 'offline') colorClass = 'bg-[#ef4444]';

    const base = 'absolute rounded-full border-[1.5px] border-white z-10';
    if (this.style === AvatarStyle.DETAIL) {
      return `${base} w-4.5 h-4.5 bottom-0 right-0 ${colorClass}`;
    }
    // The list marker overlaps the lower-right photo corner, like the reference design.
    return `${base} w-2.5 h-2.5 -bottom-0.5 -right-0.5 ${colorClass}`;
  });
}
