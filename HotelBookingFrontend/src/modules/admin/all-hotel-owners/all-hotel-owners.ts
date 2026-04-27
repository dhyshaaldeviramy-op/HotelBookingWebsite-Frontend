import { Component, OnInit } from '@angular/core';
import { SuperAdminService } from '../../../core/services/super-admin.service';
import { CommonModule } from '@angular/common';

interface User {
  userId: number;
  name: string;
  email: string;
  status: string;
}

@Component({
  selector: 'app-all-hotel-owners',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './all-hotel-owners.html',
  styleUrl: './all-hotel-owners.css'
})
export class AllHotelOwnersComponent implements OnInit {
  allHotelOwners: User[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(private superAdminService: SuperAdminService) { }

  ngOnInit(): void {
    this.loadAllHotelOwners();
  }

  loadAllHotelOwners(): void {
    this.loading = true;
    this.error = null;
    this.superAdminService.getAllHotelOwners().subscribe({
      next: (owners: User[]) => {
        this.allHotelOwners = owners;
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Error fetching all hotel owners:', err);
        this.error = 'Failed to load hotel owners. Please try again.';
        this.loading = false;
      }
    });
  }

  approveOwner(userId: number): void {
    this.superAdminService.approveHotelOwner(userId).subscribe({
      next: () => {
        alert('Hotel owner approved successfully!');
        this.loadAllHotelOwners(); // Refresh the list
      },
      error: (err: any) => {
        console.error('Error approving owner:', err);
        alert('Failed to approve hotel owner.');
      }
    });
  }

  rejectOwner(userId: number): void {
    this.superAdminService.rejectHotelOwner(userId).subscribe({
      next: () => {
        alert('Hotel owner rejected successfully!');
        this.loadAllHotelOwners(); // Refresh the list
      },
      error: (err: any) => {
        console.error('Error rejecting owner:', err);
        alert('Failed to reject hotel owner.');
      }
    });
  }
}
