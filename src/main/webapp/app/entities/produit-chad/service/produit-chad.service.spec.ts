import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IProduitChad } from '../produit-chad.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../produit-chad.test-samples';

import { ProduitChadService } from './produit-chad.service';

const requireRestSample: IProduitChad = {
  ...sampleWithRequiredData,
};

describe('ProduitChad Service', () => {
  let service: ProduitChadService;
  let httpMock: HttpTestingController;
  let expectedResult: IProduitChad | IProduitChad[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ProduitChadService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a ProduitChad', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const produit = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(produit).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ProduitChad', () => {
      const produit = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(produit).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a ProduitChad', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ProduitChad', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a ProduitChad', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addProduitChadToCollectionIfMissing', () => {
      it('should add a ProduitChad to an empty array', () => {
        const produit: IProduitChad = sampleWithRequiredData;
        expectedResult = service.addProduitChadToCollectionIfMissing([], produit);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(produit);
      });

      it('should not add a ProduitChad to an array that contains it', () => {
        const produit: IProduitChad = sampleWithRequiredData;
        const produitCollection: IProduitChad[] = [
          {
            ...produit,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addProduitChadToCollectionIfMissing(produitCollection, produit);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ProduitChad to an array that doesn't contain it", () => {
        const produit: IProduitChad = sampleWithRequiredData;
        const produitCollection: IProduitChad[] = [sampleWithPartialData];
        expectedResult = service.addProduitChadToCollectionIfMissing(produitCollection, produit);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(produit);
      });

      it('should add only unique ProduitChad to an array', () => {
        const produitArray: IProduitChad[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const produitCollection: IProduitChad[] = [sampleWithRequiredData];
        expectedResult = service.addProduitChadToCollectionIfMissing(produitCollection, ...produitArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const produit: IProduitChad = sampleWithRequiredData;
        const produit2: IProduitChad = sampleWithPartialData;
        expectedResult = service.addProduitChadToCollectionIfMissing([], produit, produit2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(produit);
        expect(expectedResult).toContain(produit2);
      });

      it('should accept null and undefined values', () => {
        const produit: IProduitChad = sampleWithRequiredData;
        expectedResult = service.addProduitChadToCollectionIfMissing([], null, produit, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(produit);
      });

      it('should return initial array if no ProduitChad is added', () => {
        const produitCollection: IProduitChad[] = [sampleWithRequiredData];
        expectedResult = service.addProduitChadToCollectionIfMissing(produitCollection, undefined, null);
        expect(expectedResult).toEqual(produitCollection);
      });
    });

    describe('compareProduitChad', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareProduitChad(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareProduitChad(entity1, entity2);
        const compareResult2 = service.compareProduitChad(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareProduitChad(entity1, entity2);
        const compareResult2 = service.compareProduitChad(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareProduitChad(entity1, entity2);
        const compareResult2 = service.compareProduitChad(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
