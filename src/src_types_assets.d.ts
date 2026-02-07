// Allow importing image and style assets in TypeScript/TSX
declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.gif";
declare module "*.svg" {
  const content: string;
  export default content;
}
declare module "*.module.css";
declare module "*.module.scss";
declare module "*.css";
declare module "*.scss";