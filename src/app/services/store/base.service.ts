import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IAccount } from '../../../shared/interfaces/accounts.interface';
import { SessionService } from '../session.service';

@Injectable({
  providedIn: 'root'
})
export class BaseService<T1, T2> {

  protected store: T2;
  public changes:Subject<T1[]> = new Subject();

  constructor(
    _store: T2,
    protected sessionService: SessionService
    ) { 
    this.store = _store;
  }

  public all(): T1[] {
    return (this.store as any).all(this.sessionService.activeAccount);
  }

  public get(id: number): T1 {
    return (this.store as any).get(id);
  }

  public add(data: T1): void {
    (this.store as any).add(data);
    this.changes.next(this.all())
  }

  public update(data: T1): void {
    (this.store as any).update(data);
  }

  public delete(id: number): void {
    (this.store as any).delete(id);
    this.changes.next(this.all())
  }

  public lastId(): number {
    return (this.store as any).lastId();
  }
}
