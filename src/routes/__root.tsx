import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import DefaultLayout from '@/layouts'
import { Provider } from '@/components/provider'

export const Route = createRootRoute({
  component: () => (
    <DefaultLayout>
      <Provider themeProps={{ attribute: "class", defaultTheme: "dark" }}>
        <Outlet />
      </Provider>
      <TanStackDevtools
        config={{
          position: 'bottom-right',
        }}
        plugins={[
          {
            name: 'Tanstack Router',
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
    </DefaultLayout>
  ),
})
