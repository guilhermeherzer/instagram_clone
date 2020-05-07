import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NovoPostPage } from './novo-post.page';

describe('NovoPostPage', () => {
  let component: NovoPostPage;
  let fixture: ComponentFixture<NovoPostPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovoPostPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NovoPostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
