import { Component, OnInit, ViewChild } from '@angular/core';
import moment from 'moment';
import { ModalController, NavController, LoadingController } from '@ionic/angular';
import { ConfirmModalPage } from '../confirm-modal/confirm-modal.page';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import { LoginPage } from '../login/login.page';
import { CreateSlotPage } from '../create-slot/create-slot.page';
import { UtilAlertService } from 'src/app/services/util/util-alert.service';
import { VendorDeatil } from 'src/app/app.const';
import { WebCheckInModel } from '../model/web-checkIn.model';
import { CarouselInModalComponent } from 'src/app/components/carousel-in-modal/carousel-in-modal.component';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.page.html',
  styleUrls: ['./stores.page.scss'],
})
export class StoresPage implements OnInit {

  storeDetail: any;
  selectedDate: any = new Date();
  selectedSlot: any;
  user: any;
  adminCreated: boolean;
  vendorDeatil: VendorDeatil;
  serviceDetail: any;
  comments: string;
  showMenu = false;
  webCheckin: WebCheckInModel;
  submit = false;
  invalidFlags: any;
  smallScreen = false;
  gallery = [
    {path: 'https://source.unsplash.com/433x649/?Uruguay'},
    {path: 'https://source.unsplash.com/530x572/?Jamaica'},
    {path: 'https://source.unsplash.com/531x430/?Kuwait'},
    {path: 'https://source.unsplash.com/586x1073/?Bermuda'},
    {path: 'https://source.unsplash.com/500x571/?Ecuador'},
    {path: 'https://source.unsplash.com/579x518/?Virgin Islands (British)'},
    {path: 'https://source.unsplash.com/503x548/?Angola'},
    {path: 'https://source.unsplash.com/511x630/?Mauritania'},
    {path: 'https://source.unsplash.com/414x767/?Sri Lanka'},
    {path: 'https://source.unsplash.com/443x704/?St. Helena'},
    {path: 'https://source.unsplash.com/441x1145/?Namibia'}, 
    {path: 'https://source.unsplash.com/491x1097/?Samoa'},
    {path: 'https://source.unsplash.com/570x851/?Eritrea'},
    {path: 'https://source.unsplash.com/560x1072/?Iraq'},
    {path: 'https://source.unsplash.com/551x598/?Togo'},
    {path: 'https://source.unsplash.com/518x813/?Romania'}
  ];
  @ViewChild('scrollMe', {static: false}) private content: any;
  onResize(event) {
    this.smallScreen = this.appService.checkSmallScreen();
  }

  constructor(
    private modalCtrl: ModalController,
    private activatedRoute: ActivatedRoute,
    public appService: AppService,
    private navController: NavController,
    private router: Router,
    private utilAlertService: UtilAlertService,
    private loadingController: LoadingController
  ) {
    this.webCheckin = new WebCheckInModel();
    this.getUserDetail();
    this.getVendorDeatil();
  }

  ngOnInit() {
    this.smallScreen = this.appService.checkSmallScreen();
  }

  scrollToBottomOnInit() {
    if(this.content) {
      this.content.scrollToBottom(300);
    }
  }

  ionViewWillEnter() {
    this.storeDetail = null;
    this.selectedDate = new Date();
    this.selectedSlot = null;
    this.activatedRoute.queryParams.subscribe((param) => {
      if (param && param.adminCreated) {
        this.adminCreated = !!param.adminCreated;
        this.storeDetail = JSON.parse(localStorage.getItem('user'));
        if (this.vendorDeatil.conceirge) {
          this.getServiceDetail();
        }
      }
    });
    this.activatedRoute.data.subscribe((data) => {
      if (data && data.storeDetail) {
        this.storeDetail = data.storeDetail.body;
        if (this.vendorDeatil.conceirge) {
          this.getServiceDetail();
        }
      }
    });
  }

  getServiceDetail() {
    this.serviceDetail = this.appService.getServiceDetail(this.storeDetail);
  }

  selectPreviousDate() {
    this.storeDetail.listOfSlots = [];
    this.selectedDate = moment(this.selectedDate).subtract(1, 'days');
    const query = {
      loginId: this.storeDetail.loginId,
      date: moment(this.selectedDate).format('DD-MM-YYYY')
    };
    this.appService.getStoreDetail(query).subscribe((res) => {
      this.storeDetail = res.body;
    });
  }

  selectNextDate() {
    this.storeDetail.listOfSlots = [];
    this.selectedDate = moment(this.selectedDate).add(1, 'days');
    const query = {
      loginId: this.storeDetail.loginId,
      date: moment(this.selectedDate).format('DD-MM-YYYY')
    };
    this.appService.getStoreDetail(query).subscribe((res) => {
      this.storeDetail = res.body;
    });
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }
  
  selectMenuSlide(index) {
    console.log(index);
  }

  async openCarouselInModal(index, array) {
    if(array && array.length) {
      const modal = await this.modalCtrl.create({
        animated: true,
        showBackdrop: true,
        cssClass: 'carousel-in-modal',
        component: CarouselInModalComponent,
        componentProps: {
          imgPath: array[index].path
        }
      });
      return await modal.present();
    }
  }

  onSlotSelection(slot) {
    if (slot) {
      this.selectedSlot = slot;
    }
  }

  async successModal(message = '') {
    const modal = await this.modalCtrl.create({
      cssClass: 'login-modal-page',
      animated: true,
      showBackdrop: true,
      component: ConfirmModalPage,
      componentProps: {
        type: this.user.type,
        message
      }
    });
    modal.onDidDismiss().then((dataReturned) => {
      console.log(dataReturned);
    });
    return await modal.present();
  }

  async book(user = this.user) {
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    await loading.present();
    if (user) {
      if (this.storeDetail && this.selectedSlot) {
        const slotDeatil: any = {
          bookingDate: this.storeDetail.date,
          registerId: this.storeDetail.registerId,
          slotTime: this.selectedSlot.slotTime,
          userId: user.userId,
          categoryId: this.vendorDeatil.idCategory
        };
        if (this.serviceDetail.checkinForm) {
          slotDeatil.webCheckinDetails = this.webCheckin;
        }
        if (this.vendorDeatil && this.vendorDeatil.conceirge) {
          slotDeatil.comments = this.comments;
        }
        const room_no = localStorage.getItem('room_no') ? JSON.parse(localStorage.getItem('room_no')) : null ;
        if (room_no) {
          slotDeatil.room_no = room_no;
        }
        this.appService.bookSlot(slotDeatil).subscribe((res) => {
          this.selectedSlot = undefined;
          loading.dismiss();
          if (res && res.body) {
            if (!res.body.error) {
              this.successModal('Thankyou! Your request has been received. One of our team will get in touch with you shortly.');
              setTimeout(() => {
                this.dismiss();
                if (this.adminCreated) {
                  this.navController.navigateRoot('/booked-customers');
                } else {
                  this.navController.navigateRoot('/booked-slots');
                }
              }, 2000);
            } else {
              this.utilAlertService.showAlert(res.body.error);
            }
          }
        }, () => {
          loading.dismiss();
        });
      }
    } else {
      this.openLoginModal(true);
    }
  }

  bookSlot() {
    if(!this.selectedSlot) {
      this.scrollToBottomOnInit();
      return;
    }
    if (this.serviceDetail.checkinForm) {
      this.submit = true;
      this.invalidFlags = {};
      if (!this.webCheckin.emailId || !this.webCheckin.guestName || !this.webCheckin.contactNumber ||
        !this.webCheckin.address || !this.webCheckin.numberOfGuests || !this.webCheckin.emergencyContact ||
        !this.webCheckin.idProof || !this.webCheckin.healthIssues || !this.webCheckin.travelHistory ||
        !this.webCheckin.covidContact || !this.webCheckin.aarogyaSetuapp) {
          return false;
      } else if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.webCheckin.emailId))) {
        this.invalidFlags.email = true;
        return false;
      } else if (this.webCheckin.contactNumber && this.webCheckin.contactNumber.toString().length !== 10) {
        this.invalidFlags.phone = true;
        return false;
      }
    }

    if (this.adminCreated) {
      this.openCreateSlotModal();
    } else {
      if (localStorage.getItem('user')) {
        this.book();
      } else {
        this.openLoginModal();
      }
    }
  }

  async openCreateSlotModal() {
    const modal = await this.modalCtrl.create({
      cssClass: 'login-modal-page',
      animated: true,
      showBackdrop: true,
      component: CreateSlotPage,
      componentProps: {
        type: false
      }
    });
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned.data && dataReturned.data.user) {
        this.book(dataReturned.data.user);
      }
    });
    return await modal.present();
  }

  async openLoginModal(openList = false) {
    const modal = await this.modalCtrl.create({
      cssClass: 'login-modal-page',
      animated: true,
      showBackdrop: true,
      component: LoginPage,
      componentProps: {
        type: false
      }
    });
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned.data && dataReturned.data.flag) {
        if (openList) {
          this.router.navigate(['booked-slots']);
        } else {
          this.book();
        }
      } else {
        localStorage.removeItem('user');
        this.appService.setLoginFalg(false);
        this.appService.setUserDetail(null);
      }
    });
    return await modal.present();
  }

  isTodayCheck() {
    const today = moment(new Date()).format('DD-MM-YYYY');
    const selectDate = moment(this.selectedDate).format('DD-MM-YYYY');
    return today === selectDate ? true : false;
  }

  async dismiss() {
    await this.modalCtrl.dismiss();
  }

  getUserDetail() {
    this.appService.userDetail.subscribe((res) => {
      this.user = res;
    });
  }

  getVendorDeatil() {
    this.appService.vendorDeatil.subscribe((res) => {
      this.vendorDeatil = res;
    });
  }

  myAppointment() {
    if (localStorage.getItem('user')) {
      this.router.navigate(['booked-slots']);
    } else {
      this.openLoginModal(true);
    }
  }

}
