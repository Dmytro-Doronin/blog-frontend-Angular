import { TestBed, ComponentFixture } from '@angular/core/testing'
import { AuthInputComponent } from './auth-input.component'

import { FormControl, ReactiveFormsModule } from '@angular/forms' // для работы с FormControl
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { EyeOpenComponent } from '../eye-open/eye-open.component'
import { EyeCloseComponent } from '../eye-close/eye-close.component' // чтобы игнорировать другие дочерние компоненты

describe('AuthInputComponent', () => {
  let component: AuthInputComponent
  let fixture: ComponentFixture<AuthInputComponent>
  let compiled: HTMLElement

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthInputComponent, EyeOpenComponent, EyeCloseComponent],
      imports: [ReactiveFormsModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthInputComponent)
    component = fixture.componentInstance
    compiled = fixture.nativeElement
    component.id = 'test-input'
    component.title = 'Password'
    component.type = 'password'
    component.showIcon = true
    component.control = new FormControl('')
    fixture.detectChanges()
  })

  it('should create the component', () => {
    expect(component).toBeTruthy()
  })

  it('should render input with correct type', () => {
    const inputElement: HTMLInputElement = compiled.querySelector('input')!
    expect(inputElement.type).toBe('password')
  })

  it('should toggle input type on eye icon click', () => {
    const eyeIcon = compiled.querySelector('.eyeContainer')! as HTMLElement
    const inputElement: HTMLInputElement = compiled.querySelector('input')!

    expect(inputElement.type).toBe('password')

    eyeIcon.click()
    fixture.detectChanges()

    expect(inputElement.type).toBe('text')
  })

  it('should show label with correct title', () => {
    const labelElement: HTMLLabelElement = compiled.querySelector('label')!
    expect(labelElement.textContent).toContain('Password')
  })

  it('should update FormControl value', () => {
    const inputElement: HTMLInputElement = compiled.querySelector('input')!
    inputElement.value = 'new value'
    inputElement.dispatchEvent(new Event('input'))
    fixture.detectChanges()

    expect(component.control.value).toBe('new value')
  })
})
