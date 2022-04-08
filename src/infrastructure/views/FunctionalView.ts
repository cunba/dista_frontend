export type FunctionalView<TViewModel> = React.SFC<{ vm: TViewModel }>;

export type FunctionalViews<TViewModel, T2ViewModel> = React.SFC<{ vm: TViewModel, vm2: T2ViewModel }>