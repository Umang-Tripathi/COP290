#include <iostream>
#include <vector>
#include <algorithm>
#include <string>
#include <unordered_map>
#include <numeric>
#include <cmath>
#include <stack>
#include <map>
#include <limits>
#include <set>
#include <queue>
using namespace std;

#define pb push_back
#define fo(i, n) for (long long i = 0; i < n; i++)
#define fo1(i, n, s, d) for (int i = s; i < n; i += d)
#define all(v) v.begin(), v.end()
#define mii map<int, int>
#define mib map<int, bool>
#define en "\n"
#define vi vector<int>
#define vs vector<string>
#define vc vector<char>
#define mpr make_pair
#define f first
#define s second
#define vec vector
#define N 1000000007
#define pii pair<int, int>
#define ll long long

using namespace std;

bool isPrime(ll n)
{
    if (n <= 1)
    {
        return false;
    }
    for (ll i = 2; i <= sqrt(n); ++i)
    {
        if (n % i == 0)
        {
            return false;
        }
    }
    return true;
}

///////// CODE FROM HERE /////////////

void solve()
{
    ll a, b, c;
    cin >> a >> b >> c;
    vec<ll> v(b);
    fo(i, b)
    {
        cin >> v[i];
    }
    sort(all(v));
    ll res = 1;
    ll curr = v[0];
    vec<ll> gaps;
    for (ll i = 1; i < b; i++)
    {
        if (v[i] == curr + 2)
        {
            res += 2;
            curr = v[i];
        }
        else
        {
            gaps.pb(v[i] - curr);
            res++;
            curr = v[i];
        }
    }
    if (v.back() == a - 1 && v[0] == 1)
    {
        res++;
    }
    if (v.back() == a && v[0] == 2)
    {
        res++;
    }
    if (v[0] + (a - v.back()) > 2)
    {
        gaps.pb(v[0] + (a - v.back()));
    }
    sort(all(gaps));
    for (ll i = gaps.size() - 1; i >= 0; i--)
    {
        ll edge = gaps[i];
        if (edge % 2 == 0)
        {
            ll need = (edge / 2) - 1;
            if (c >= need)
            {
                res += (gaps[i] - 1);
                c -= need;
            }
            else
            {
                bool ho = false;
                for (ll j = i - 1; j >= 0; j--)
                {
                    if (gaps[j] == ((2 * c) + 2) || gaps[j] == ((2 * c) + 1))
                    {
                        res += (gaps[j] - 1);
                        ho = true;
                        break;
                    }
                }
                if (!ho)
                {
                    res += (2 * c);
                    break;
                }
            }
        }
        else
        {
            ll need = (edge / 2);
            if (c >= need)
            {
                res += (gaps[i] - 1);
                c -= need;
            }
            else
            {
                bool ho = false;
                for (ll j = i - 1; j >= 0; j--)
                {
                    if (gaps[j] == ((2 * c) + 2) || gaps[j] == ((2 * c) + 1))
                    {
                        res += (gaps[j] - 1);
                        ho = true;
                        break;
                    }
                }
                if (!ho)
                {
                    res += (2 * c);
                    break;
                }
            }
        }
    }
    cout << res - 2 << en;
}

int main()
{
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    ll tt;
    cin >> tt;
    while (tt--)
    {
        solve();
    }
    return 0;
}