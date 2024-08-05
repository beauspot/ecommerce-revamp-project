import { Router, Request, Response, NextFunction } from "express";

import { authModel } from "@/models/userModels";
import { UserCartModel } from "@/models/cartModel";
import { CouponModel } from "@/models/coupon.models";
import { UserOrderModel } from "@/models/orderModel";
import { productModel } from "@/models/productsModels";

import { fgtPswdSchema } from "@/schema/fgtpwd.schema";
import { updatePassword } from "@/schema/updatepwd.schema";
import { resetPwdInput } from "@/schema/resetpwd.schema";
import { createUserSchema } from "@/schema/userSchema";
import { loginUserSchema } from "@/schema/login.schema";
import { prodWishlistSchema } from "@/schema/wishlist.schema";
import { createAddressSchema } from "@/schema/address.schema";
import { restrictUserSchema } from "@/schema/userRestriction.schema";

import { validateResource } from "@/middlewares/validate";

import { UserAuthServiceClass } from "@/services/user.service";
import { UserAuthControllerClass } from "@/controllers/userCtrls";
import { auth, isAdmin } from "@/helpers/middlewares/authMiddleware";

export function authRoutes(): Router {
  const router = Router();
  let userService = new UserAuthServiceClass(
    authModel,
    UserOrderModel,
    productModel,
    CouponModel,
    UserCartModel
  );
  let usercontroller = new UserAuthControllerClass(userService);

  router
    .route("/signup")
    .post(
      validateResource(createUserSchema),
      (req: Request, res: Response, next: NextFunction) =>
        usercontroller.create_a_user(req, res, next)
    );

  router
    .route("/login")
    .post(
      validateResource(loginUserSchema),
      (req: Request, res: Response, next: NextFunction) =>
        usercontroller.LoginUser(req, res, next)
    );

  router
    .route("/admin-login")
    .post(
      validateResource(loginUserSchema),
      (req: Request, res: Response, next: NextFunction) =>
        usercontroller.LoginAdmin(req, res, next)
    );

  router
    .route("/cart/cash-order")
    .post((req: Request, res: Response, next: NextFunction) =>
      usercontroller.createOrderCtrl(req, res)
    );

  router
    .route("/cart")
    .post(auth, (req: Request, res: Response, next: NextFunction) =>
      usercontroller.userCartCtrl(req, res)
    );

  router
    .route("/cart/applycoupon")
    .post(auth, (req: Request, res: Response, next: NextFunction) =>
      usercontroller.applyCouponCtrl(req, res)
    );

  router
    .route("/save-address")
    .put(
      validateResource(createAddressSchema),
      auth,
      (req: Request, res: Response, next: NextFunction) =>
        usercontroller.saveAddress(req, res)
    );

  router
    .route("/wishlist")
    .put(
      validateResource(prodWishlistSchema),
      auth,
      (req: Request, res: Response, next: NextFunction) =>
        usercontroller.addToWishList(req, res)
    );

  router
    .route("/allusers")
    .get(auth, isAdmin, (req: Request, res: Response, next: NextFunction) =>
      usercontroller.getAllUser(req, res, next)
    );
  router
    .route("/refresh-token")
    .get((req: Request, res: Response, next: NextFunction) =>
      usercontroller.handleRefreshToken(req, res, next)
    );
  router
    .route("/logout")
    .get((req: Request, res: Response, next: NextFunction) =>
      usercontroller.logoutUserCtrl(req, res, next)
    );
  router
    .route("/user-cart")
    .get(auth, (req: Request, res: Response, next: NextFunction) =>
      usercontroller.getUserCartController(req, res)
    );
  router
    .route("/get-orders")
    .get(auth, (req: Request, res: Response, next: NextFunction) =>
      usercontroller.getOrdersController(req, res)
    );

  router
    .route("/empty-cart")
    .delete(auth, (req: Request, res: Response, next: NextFunction) =>
      usercontroller.emptyCartCtrl(req, res)
    );
  router
    .route("/getallorders")
    .get(auth, isAdmin, (req: Request, res: Response, next: NextFunction) =>
      usercontroller.getAllOrdersController(req, res, next)
    );

  router
    .route("/forgetpassword")
    .post(
      validateResource(fgtPswdSchema),
      (req: Request, res: Response, next: NextFunction) =>
        usercontroller.forgotPassword(req, res, next)
    );
  router
    .route("/resetpassword/:token")
    .patch(
      validateResource(resetPwdInput),
      (req: Request, res: Response, next: NextFunction) =>
        usercontroller.passwordReset(req, res, next)
    );

  router
    .route("/wishlist/:id")
    .get(auth, (req: Request, res: Response, next: NextFunction) =>
      usercontroller.getWishList(req, res)
    );

  router
    .route("/getorderbyuser/:id")
    .get(auth, isAdmin, (req: Request, res: Response, next: NextFunction) =>
      usercontroller.getOrderByUserIDController(req, res)
    );

  router
    .route("/:id")
    .get((req: Request, res: Response, next: NextFunction) =>
      usercontroller.getUser(req, res, next)
    );

  router
    .route("/:id")
    .delete((req: Request, res: Response, next: NextFunction) =>
      usercontroller.deleteUser(req, res, next)
    );

  router
    .route("/:id")
    .patch(auth, isAdmin, (req: Request, res: Response, next: NextFunction) =>
      usercontroller.updateuserCtrl(req, res, next)
    );

  router
    .route("/block-user/:id")
    .patch(
      validateResource(restrictUserSchema),
      auth,
      isAdmin,
      (req: Request, res: Response, next: NextFunction) =>
        usercontroller.blockUserCtrl(req, res, next)
    );

  router
    .route("/unblock-user/:id")
    .patch(
      validateResource(restrictUserSchema),
      auth,
      isAdmin,
      (req: Request, res: Response, next: NextFunction) =>
        usercontroller.UnBlockUserCtrl(req, res, next)
    );

  router
    .route("/order/update-order/:id")
    .put(auth, isAdmin, (req: Request, res: Response, next: NextFunction) =>
      usercontroller.UpdateOrderStatusController(req, res)
    );

  return router;
}
