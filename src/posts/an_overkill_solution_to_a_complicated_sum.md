---
created: October 24, 2022
title: An Overkill Solution to a Monster Sum
tags: math
---

# Introduction

I was interested in finding a closed form to the following sum. Since I saw a [problem](https://www.youtube.com/watch?v=b9-377emPKc&t=0s), that reduces to this.
$$
\sum_{k=0}^{n} \frac{1}{k(k+1)\cdots(k+a)} = \sum_{k=0}^{n}\prod_{l=0}^{a} \frac{1}{k+l}
$$

# Solution

We start with the [finite geometric series](https://mathworld.wolfram.com/GeometricSeries.html),

$$
\begin{equation}
\sum_{k=1}^{n} x^{k-1} = \frac{1-x^{n}}{1-x} \tag{1}
\end{equation}
$$

What happens if we integrate this with respect to $x$ over the interval $[0,1]$?

$$
\sum_{k=1}^{n-1} \frac{1}{k} = \int_{0}^{1} \frac{1-x^{n}}{1-x} ~\text{d}x
$$

What happens if we integrate Equation $1$ with respect to $x$ over the interval $[0,1]$ two times?

$$
\sum_{k=1}^{n-1} \frac{1}{k(k+1)} = \int_{0}^{1}\int_{0}^{1} \frac{1-x^{n}}{1-x}~\text{d}x_{1}\text{d}x_{2} \tag{2}
$$

By now it should be fairly evident to see that,
$$
\sum_{k=0}^{n} \frac{1}{k(k+1)\cdots(k+a)} = \underbrace{\int_{0}^{1}\int_{0}^{1}\cdots\int_{0}^{1}}_{a +1\; \text{times}} \frac{1-x^{n}}{1-x}~\text{d}x\text{d}x_{1}\cdots\text{d}x_{a}
$$

But how the heck would we integrate a function by $a+1$ times? Luckily some smart guy named Cauchy, came up with the following [formula](https://en.wikipedia.org/wiki/Cauchy_formula_for_repeated_integration). That is,
$$
\underbrace{\int_{a}^{x}\int_{a}^{\sigma_{1}}\cdots\int_{a}^{\sigma_{n-1}}}_{n\;\text{times}} f(x)~\text{d}x \cdot  
    = \frac{1}{(n-1)!}\int_{a}^{x}(x-t)^{n-1}f(t)~\text{d}t \tag{3}
$$

Now we can see that from Equation $2$, $f(t) = \dfrac{1-t^{n}}{1-t}$, $n=a+1$ and that $x=1$. Plugging this to the formula at Equation $3$, we have
$$
\begin{align*}
\int_{0}^{1} \cdots \int_{0}^{1} \frac{1-x^{n}}{1-x}~\text{d}x_{1}\text{d}x_{2} 
    &= \frac{1}{((a+1) -1)!}\int_{0}^{1}(1-t)^{(a+1)-1} \cdot \frac{1-t^{n}}{1-t}~\text{d}t \\
    &= \frac{1}{a!}\int_{0}^{1}(1-t)^{a-1} (1-t^{n})~\text{d}t \\
    &= \frac{1}{a!}\int_{0}^{1}(1-t)^{a-1}~\text{d}t - \frac{1}{a!}\int_{0}^{1}(1-t)^{a-1}t^n~\text{d}t\\
\end{align*}
$$

We denote $I_{1}$ and $I_{2}$ as follows, and solve them separetly.
$$
\underbrace{\frac{1}{a!}\int_{0}^{1}(1-t)^{a-1}~\text{d}t}_{I_{1}} - \underbrace{\frac{1}{a!}\int_{0}^{1}(1-t)^{a-1}t^n~\text{d}t}_{I_{2}}
$$

## Solving for $I_{1}$

This is a straightforward $u$-substitution, let $u=1-t$, $-\text{d}t = \text{d}u$. As $t \to 0$, $u \to 1$ and as $t \to 1$, $u \to 0$. Thus,
$$
\begin{align*}
I_{1} &= \frac{1}{a!}\int_{1}^{0}u^{a-1}~(-\text{d}u) \\
      &= \frac{1}{a!}\int_{0}^{1}u^{a-1}~\text{du}  \\
      &= \frac{1}{a!}\frac{u^{a}}{a} \biggl|_{0}^{1} \\ 
      &= \frac{1}{a!}\frac{1}{a} \\ 
      &= \frac{1}{(a+1)!}
\end{align*}
$$

## Solving for $I_{2}$
$I_{2}$ is a little bit more tricky, but it's amazing how it is exactly the [Beta Function](https://en.wikipedia.org/wiki/Beta_function). 
More specifically, 

$$
I_{2} = \frac{1}{a!}\int_{0}^{1}(1-t)^{a-1}t^n~\text{d}t = \frac{1}{a!}\beta(a, n+1) \tag{4}
$$

The beta function, can be expressed in terms of the [Gamma Function](https://en.wikipedia.org/wiki/Gamma_function), which is just an 
analytic-continuation of the factorial function over the Real Numbers.

$$
\beta(x,y)= \frac{\Gamma(x)\cdot\Gamma(y)}{\Gamma(x+1)} = \frac{(x-1)!(y-1)!}{(x+y-1)!} \tag{5}
$$

From Equation $4$, we get,
$$
I_{2} = \frac{1}{a!}\beta(a, n+1) = \frac{1}{a!}\frac{(a-1)!n!}{(a+n)!}
$$

## Conclusion
Combining $I_{1}$ and $I_{2}$ to get the closed form, 

$$
\sum_{k=0}^{n} \frac{1}{k(k+1)\cdots(k+a)} = I_{1} - I_{2} = \frac{1}{(a+1)1} - \frac{n!}{a(a+n)!}
$$

$$
\boxed{
    \sum_{k=0}^{n} \frac{1}{k(k+1)\cdots(k+a)}= \frac{1}{(a+1)1} - \frac{n!}{a(a+n)!}
}
$$

I hope you enjoy reading this!




