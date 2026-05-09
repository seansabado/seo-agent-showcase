export interface FunctionActor {
  uid: string;
  email?: string;
}

export interface CallableRequest<T = unknown> {
  auth?: { uid?: string; email?: string };
  data: T;
}

export const requireAuth = <T>(request: CallableRequest<T>): FunctionActor => {
  const uid = request.auth?.uid;
  if (!uid) {
    throw new Error("unauthenticated");
  }

  return {
    uid,
    email: request.auth?.email,
  };
};
