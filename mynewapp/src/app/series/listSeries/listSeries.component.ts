import { Component, OnInit } from '@angular/core';
import { SeriesService } from '../series.service'; // Ruta al servicio
import { Series } from '../series.model'; // Ruta al modelo

@Component({
  selector: 'app-list-series',
  templateUrl: './listSeries.component.html',
  styleUrls: ['./listSeries.component.css']
})
export class ListSeriesComponent implements OnInit {
  series: Series[] = []; // Array para almacenar las series
  averageSeasons: number = 0; // Promedio de temporadas

  constructor(private seriesService: SeriesService) {}

  ngOnInit(): void {
    // Obtener las series al inicializar el componente
    this.seriesService.getSeries().subscribe((data: Series[]) => {
      this.series = data;
      this.calculateAverageSeasons(); // Calcular el promedio de temporadas
    });
  }

  // Método para calcular el promedio de temporadas
  calculateAverageSeasons(): void {
    const totalSeasons = this.series.reduce((acc, serie) => acc + serie.seasons, 0);
    this.averageSeasons = totalSeasons / this.series.length;
  }
}
