import {
  Component,
  computed,
  effect,
  inject,
  signal,
  untracked,
} from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import {
  heroChatBubbleOvalLeftEllipsis,
  heroClipboardDocumentList,
  heroUserGroup,
  heroEye,
} from '@ng-icons/heroicons/outline';
import { BaseChartDirective } from 'ng2-charts';
import {
  ChartConfiguration,
  ChartData,
  ChartDataset,
  ChartType,
} from 'chart.js';
import { StatBoxComponent } from '../../components/stat-box/stat-box.component';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { ServerApiService } from '../../services/server-api.service';

const usersBlueprint = {
  data: [65, 59, 80, 81, 56, 55, 40],
  label: 'Tot Users',
  backgroundColor: '#fca5a520',
  pointRadius: 0,
  borderColor: '#fca5a5',
  // pointBackgroundColor: '#fca5a5',
  // pointBorderColor: '#fca5a5',
  // pointHoverBackgroundColor: '#fff',
  // pointHoverBorderColor: '#fca5a5',
  // fill: 'origin',
  tension: 0.2,
  borderWidth: 1.5,
};

const postsBlueprint = {
  data: [],
  label: 'Tot Posts',
  backgroundColor: '#93c5fd20',
  borderColor: '#93c5fd',
  pointRadius: 0,
  // pointBackgroundColor: '#93c5fd',
  // pointBorderColor: '#93c5fd',
  // pointHoverBackgroundColor: '#fff',
  // pointHoverBorderColor: '#93c5fd',
  // fill: 'origin',
  tension: 0.1,
  borderWidth: 1.5,
};

const commentsBlueprint = {
  data: [],
  label: 'Tot Comments',
  backgroundColor: '#86efac20',
  borderColor: '#86efac',
  pointRadius: 0,
  // pointBackgroundColor: '#86efac',
  // pointBorderColor: '#86efac',
  // pointHoverBackgroundColor: '#fff',
  // pointHoverBorderColor: '#86efac',
  // fill: 'origin',
  tension: 0.1,
  borderWidth: 1.5,
};

const viewsBlueprint = {
  data: [],
  label: 'Tot Views',
  backgroundColor: '#fde04720',
  borderColor: '#fde047',
  pointRadius: 0,
  // pointBackgroundColor: '#fde047',
  // pointBorderColor: '#fde047',
  // pointHoverBackgroundColor: '#fff',
  // pointHoverBorderColor: '#fde047',
  // fill: 'origin',
  tension: 0.1,
  borderWidth: 1.5,
};

@Component({
  selector: 'dashboard',
  imports: [
    BaseChartDirective,
    StatBoxComponent,
    CommonModule,
    SpinnerComponent,
  ],
  providers: [
    provideIcons({
      heroChatBubbleOvalLeftEllipsis,
      heroClipboardDocumentList,
      heroUserGroup,
      heroEye,
    }),
    ServerApiService,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  private serverApi = inject(ServerApiService);

  usersSelected = signal(true);
  postsSelected = signal(true);
  commentsSelected = signal(true);
  viewsSelected = signal(true);

  selectedDays = signal(7);

  usersData = signal<ChartDataset | undefined>(undefined);
  postsData = signal<ChartDataset | undefined>(undefined);
  commentsData = signal<ChartDataset | undefined>(undefined);
  viewsData = signal<ChartDataset | undefined>(undefined);

  lineChartData = signal<ChartConfiguration['data']>({
    datasets: [],
  });

  isDataLoading = signal(false);

  lineChartType: ChartType = 'line';

  constructor() {
    effect(() => {
      this.loadData(this.selectedDays());
    });

    effect(() => {
      if (this.usersSelected() && this.usersData()) {
        this.lineChartData.update((oldValue) => {
          console.log([...oldValue.datasets, this.usersData()!]);
          return {
            ...oldValue,
            datasets: [...oldValue.datasets, this.usersData()!],
          };
        });
      } else {
        this.lineChartData.update((oldValue) => {
          const newDatasets = oldValue.datasets.filter(
            (dataSet) => dataSet?.label != 'Tot Users',
          );
          return {
            ...oldValue,
            datasets: newDatasets,
          };
        });
      }
    });

    effect(() => {
      if (this.postsSelected() && this.postsData()) {
        this.lineChartData.update((oldValue) => {
          return {
            ...oldValue,
            datasets: [...oldValue.datasets, this.postsData()!],
          };
        });
      } else {
        this.lineChartData.update((oldValue) => {
          const newDatasets = oldValue.datasets.filter(
            (dataSet) => dataSet?.label != 'Tot Posts',
          );
          return {
            ...oldValue,
            datasets: newDatasets,
          };
        });
      }
    });

    effect(() => {
      if (this.commentsSelected() && this.commentsData()) {
        this.lineChartData.update((oldValue) => {
          return {
            ...oldValue,
            datasets: [...oldValue.datasets, this.commentsData()!],
          };
        });
      } else {
        this.lineChartData.update((oldValue) => {
          const newDatasets = oldValue.datasets.filter(
            (dataSet) => dataSet?.label != 'Tot Comments',
          );
          return {
            ...oldValue,
            datasets: newDatasets,
          };
        });
      }
    });

    effect(() => {
      if (this.viewsSelected() && this.viewsData()) {
        this.lineChartData.update((oldValue) => {
          return {
            ...oldValue,
            datasets: [...oldValue.datasets, this.viewsData()!],
          };
        });
      } else {
        this.lineChartData.update((oldValue) => {
          const newDatasets = oldValue.datasets.filter(
            (dataSet) => dataSet?.label != 'Tot Views',
          );
          return {
            ...oldValue,
            datasets: newDatasets,
          };
        });
      }
    });
  }

  toggleUsers() {
    this.usersSelected.update((oldValue) => !oldValue);
  }

  togglePosts() {
    this.postsSelected.update((oldValue) => !oldValue);
  }

  toggleComments() {
    this.commentsSelected.update((oldValue) => !oldValue);
  }

  toggleViews() {
    this.viewsSelected.update((oldValue) => !oldValue);
  }

  updateSelectedDays(days: number) {
    this.selectedDays.set(days);
  }

  loadData(days: number) {
    this.isDataLoading.set(true);

    const labels = Array.from({ length: days }, (_, i) => {
      const date = new Date();
      date.setDate(new Date().getDate() - (days - 1 - i)); // Go back in time
      // console.log('date: ', date);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
    });

    this.lineChartData.set({ datasets: [], labels: labels });
    this.usersData.set(undefined);
    this.postsData.set(undefined);
    this.commentsData.set(undefined);
    this.viewsData.set(undefined);

    // Load users
    this.serverApi.loadUsers(days).subscribe({
      next: (fetchedUsers) => {
        console.log('-> fetchedPosts: ', fetchedUsers.data);

        if (fetchedUsers.results > 0) {
          let users: number[] = [];
          labels.forEach((label) => {
            const usersOfTheDay = fetchedUsers.data.users.filter(
              (user) =>
                new Date(user.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                }) == label,
            );
            if (usersOfTheDay.length > 0) {
              users.push(usersOfTheDay.length);
            } else {
              users.push(0);
            }
          });

          this.usersData.set({
            ...usersBlueprint,
            data: users,
          });
        }
        this.isDataLoading.set(false);
      },
    });

    // Load posts
    this.serverApi.loadPosts(days).subscribe({
      next: (fetchedPosts) => {
        console.log('-> fetchedPosts: ', fetchedPosts.data);

        if (fetchedPosts.results > 0) {
          let posts: number[] = [];
          labels.forEach((label) => {
            const postsOfTheDay = fetchedPosts.data.blogPosts.filter(
              (post) =>
                new Date(post.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                }) == label,
            );
            if (postsOfTheDay.length > 0) {
              posts.push(postsOfTheDay.length);
            } else {
              posts.push(0);
            }
          });

          this.postsData.set({
            ...postsBlueprint,
            data: posts,
          });
        }
        this.isDataLoading.set(false);
      },
    });

    // Load comments
    this.serverApi.loadComments(days).subscribe({
      next: (fetchedComments) => {
        console.log('-> fetchedComments: ', fetchedComments.data);
        if (fetchedComments.results > 0) {
          let comments: number[] = [];
          labels.forEach((label) => {
            const commentsOfTheDay =
              fetchedComments.data.comments.filter(
                (comment) =>
                  new Date(comment.createdAt).toLocaleDateString(
                    'en-US',
                    {
                      month: 'short',
                      day: 'numeric',
                    },
                  ) == label,
              );
            if (commentsOfTheDay.length > 0) {
              comments.push(commentsOfTheDay.length);
            } else {
              comments.push(0);
            }
          });

          this.commentsData.set({
            ...commentsBlueprint,
            data: comments,
          });
        }
        this.isDataLoading.set(false);
      },
    });

    // Load views
    this.serverApi.loadViews(days).subscribe({
      next: (fetchedPosts) => {
        console.log('-> fetchedComments: ', fetchedPosts.data);
        if (fetchedPosts.results > 0) {
          let views: number[] = [];
          labels.forEach((label) => {
            const viewsOfTheDay = fetchedPosts.data.blogPosts.filter(
              (blogPost) =>
                new Date(blogPost.createdAt).toLocaleDateString(
                  'en-US',
                  {
                    month: 'short',
                    day: 'numeric',
                  },
                ) == label,
            );
            if (viewsOfTheDay.length > 0) {
              views.push(
                viewsOfTheDay.reduce(
                  (accumulator, currentValue) =>
                    accumulator + currentValue.views,
                  0,
                ),
              );
            } else {
              views.push(0);
            }
          });

          this.viewsData.set({
            ...viewsBlueprint,
            data: views,
          });
        }
        this.isDataLoading.set(false);
      },
    });
  }

  sumOfValues(values: ChartDataset | undefined) {
    let retValue = 0;
    if ((values?.data ?? []).length > 0) {
      retValue = (values?.data as number[]).reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0,
      );
    }
    return retValue;
  }
}
