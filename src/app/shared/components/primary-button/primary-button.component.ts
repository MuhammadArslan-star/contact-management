import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-primary-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './primary-button.component.html',
  styleUrl: './primary-button.component.scss'
})
export class PrimaryButtonComponent {
  @Input() label: string = 'Message';
  @Input() disabled: boolean = false;

  get buttonClasses(): string {
    const base = 'flex items-center justify-center h-12 px-5 rounded-[11px] text-white text-[16px] font-medium cursor-pointer transition-colors';
    const enabledState = 'bg-[#6b5dd3] hover:bg-[#5a4db8]';
    const disabledState = 'bg-[#ccc] cursor-not-allowed';

    return `${base} ${this.disabled ? disabledState : enabledState}`;
  }
}
