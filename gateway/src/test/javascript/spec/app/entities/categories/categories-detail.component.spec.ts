/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { BemTestModule } from '../../../test.module';
import { CategoriesDetailComponent } from '../../../../../../main/webapp/app/entities/categories/categories-detail.component';
import { CategoriesService } from '../../../../../../main/webapp/app/entities/categories/categories.service';
import { Categories } from '../../../../../../main/webapp/app/entities/categories/categories.model';

describe('Component Tests', () => {

    describe('Categories Management Detail Component', () => {
        let comp: CategoriesDetailComponent;
        let fixture: ComponentFixture<CategoriesDetailComponent>;
        let service: CategoriesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BemTestModule],
                declarations: [CategoriesDetailComponent],
                providers: [
                    CategoriesService
                ]
            })
            .overrideTemplate(CategoriesDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CategoriesDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CategoriesService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Categories(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.categories).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
