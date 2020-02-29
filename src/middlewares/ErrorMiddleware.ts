import { Context, Next } from 'koa';

async function ErrorMiddleware(ctx: Context, next: Next) {
  try {
    await next();
  } catch (err) {
    if (ctx.status === 404) {
      ctx.status = 404;
      ctx.body = 'Not Found';
    } else {
      ctx.status = 502;
      ctx.body = 'Something want wrong.';
    }
  }
}

export default ErrorMiddleware;
