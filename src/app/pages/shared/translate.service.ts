import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TranslateService {
  private spokenLanguageTextSubject = new BehaviorSubject<string>('');
  spokenLanguageText$ = this.spokenLanguageTextSubject.asObservable();

  private chunks: string[] = [];
  private currentChunkIndex = 0;

  setSpokenLanguageText(text: string): void {
    this.spokenLanguageTextSubject.next(text);
  }

  setChunks(text: string): void {
    this.chunks = this.chunkTextByNewLines(text);
    this.currentChunkIndex = 0;
    if (this.chunks.length > 0) {
      this.setSpokenLanguageText(this.chunks[this.currentChunkIndex]);
    }
  }

  nextChunk(): void {
    if (this.currentChunkIndex < this.chunks.length - 1) {
      this.currentChunkIndex++;
      this.setSpokenLanguageText(this.chunks[this.currentChunkIndex]);
    }
  }

  private chunkTextByNewLines(text: string): string[] {
    return text.split('\n').filter(chunk => chunk.trim().length > 0);
  }
}
