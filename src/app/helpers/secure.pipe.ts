import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Pipe({
  name: 'secure'
})
export class SecurePipe implements PipeTransform {

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }

  transform(url): Observable<SafeUrl> {
    return this.http
        .get(url, { responseType: 'blob' }).pipe(
        map(val => this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(val))));
}

}
