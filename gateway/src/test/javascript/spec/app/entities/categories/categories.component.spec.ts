/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BemTestModule } from '../../../test.module';
import { CategoriesComponent } from '../../../../../../main/webapp/app/entities/categories/categories.component';
import { CategoriesService } from '../../../../../../main/webapp/app/entities/categories/categories.service';
import { Categories } from '../../../../../../main/webapp/app/entities/categories/categories.model';

describe('Component Tests', () => {

    describe('Categories Management Component', () => {
        let comp: CategoriesComponent;
        let fixture: ComponentFixture<CategoriesComponent>;
        let service: CategoriesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BemTestModule],
                declarations: [CategoriesComponent],
                providers: [
                    CategoriesService
                ]
            })
            .overrideTemplate(CategoriesComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CategoriesComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CategoriesService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Categories(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.categories[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
