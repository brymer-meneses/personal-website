---
created: November 14, 2022
title: Feynman's Integration Technique
tags: math
---

# Introduction

During my senior years in high-school, I began falling in love with the joy of integrating obscure functions. I was obsessed watching countless of videos on Youtube about the solutions to hard integrals.

One integral, I quite vividly remember was $\displaystyle\int \sqrt[3]{\tan x}~\text{d}x$, the [solution](https://www.youtube.com/watch?v=NO693oP7nHQ) for it was $30$ minutes long, and I loved each minute of it!

Along the way, I encountered this quite nifty trick, dubbed as **Feynmann's Favorite Integration Technique** or **Differentiation Under the Integral Sign**. This will be my attempt at guiding you to become familiar with this technique.

## Guided Example

Let's start with the following integral,

$$
I = \int_{0}^{1} \frac{x^{2022} - 1}{\ln x}~\text{d}x
$$

At first glance, this integral might seem unsolvable or even non-elementary (at least I thought it was). But we will see how, this technique trivializes this integral.

Consider the following parameterization of $I$,

$$
I(t) = \int_{0}^{1} \frac{x^{t} - 1}{\ln x}~\text{d}x
$$

Notice that, $I(2022) = I$. You might say that, didn't we just make it hard, by introducing another variable? You will see that this parameterization will make everything easier.

We know take the derivative of $I(t)$ with respect to $t$.

$$
I'(t) = \frac{\text{d}}{\text{d}t} \int_{0}^{1} \frac{x^{t} - 1}{\ln x}~\text{d}x
$$

Using [Leibniz' Rule for Differentiation under the Integral Sign](https://brilliant.org/wiki/differentiate-through-the-integral/),

$$
I'(t) =  \int_{0}^{1} \frac{\partial}{\partial t}\cdot\frac{x^{t} - 1}{\ln x}~\text{d}x
$$

Now here comes, the magical part, notice that $\displaystyle\frac{\partial}{\partial t} (x^{t} - 1)= x^{t}\ln x$. Effectively cancelling the denominator!

$$
I'(t) =  \int_{0}^{1} \frac{x^{t} \cdot \cancel{\ln x}}{\cancel{\ln x}} ~\text{d}x = \int_{0}^{1} x^{t}~\text{d}x
$$

Notice how the denominator beautifully goes away as if we just slayed the head of the dragon!

$$
\begin{align*}
I'(t) &=  \frac{x^{t+1}}{t+1}\biggl|_{0}^{1} \\
      &=  \frac{1}{t+1}
\end{align*}
$$

We just need to obtain $I(t)$, but how? By ... integrating it!

$$
\begin{align*}
I(t) &= \int \frac{1}{t+1} ~\text{d}t \\
     &= \ln (t+1)  + C \\
\end{align*}
$$

Now, we just need to get rid of that pesky $C$!
Notice that, if $t=0$, then we can see that $\displaystyle I(0)=\int_{0}^{1} \frac{x^{0} - 1}{\ln x}~\text{d}x = 0$

$$
\begin{alignat*}{2}
    &\hspace{1cm}I(0) &&= \ln (0+1)  + C \\
    &\implies 0       &&= \ln 1 + C \\
    &\implies C       &&= 0
\end{alignat*}
$$

Hooray! The only thing left to do is plug in $t=2022$, to solve the integral!

$$
\begin{align*}
    \hspace{1cm}I(2022) &= I \\
                        &= \ln(1+2022) \\
                        &= \ln(2023) \\
\end{align*}
$$

And thus,

$$
\boxed{\int_{0}^{1} \frac{x^{2022} - 1}{\ln x}~\text{d}x  = \ln(2023)}
$$

Pretty cool huh? One added bonus is that we have effectively found a closed solution to the
general form of the integral. And that's about it for this blog, I hope you enjoyed reading this!
